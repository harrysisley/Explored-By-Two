import { supabase } from './supabase.js';

export async function initComments(postSlug) {
    const commentsContainer = document.getElementById('comments-container');
    if (!commentsContainer) return;

    // Render the basic structure
    renderCommentSection(commentsContainer);

    // Load existing comments
    await loadComments(postSlug);

    // Setup event listeners
    setupCommentListeners(postSlug);
}

function renderCommentSection(container) {
    container.innerHTML = `
        <div class="comments-section">
            <div class="container">
                <h3 class="comments-title">Comments</h3>
                
                <div class="comment-form-container">
                    <div id="comment-auth-message" style="display: none; text-align: center; padding: 20px;">
                        <p>Please <a href="#" onclick="window.openAuthModal(); return false;" style="text-decoration: underline; font-weight: 600;">log in</a> to leave a comment.</p>
                    </div>
                    
                    <form id="comment-form" style="display: none;">
                        <textarea id="comment-input" class="comment-input" placeholder="Share your thoughts..." required></textarea>
                        <div style="display: flex; justify-content: flex-end;">
                            <button type="submit" class="submit-comment-btn">Post Comment</button>
                        </div>
                    </form>
                </div>

                <div id="comments-list">
                    <!-- Comments will be loaded here -->
                    <div style="text-align: center; color: var(--color-text-muted);">Loading comments...</div>
                </div>
            </div>
        </div>
    `;
}

async function loadComments(postSlug) {
    const list = document.getElementById('comments-list');
    
    try {
        const { data: comments, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_slug', postSlug)
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (!comments || comments.length === 0) {
            list.innerHTML = '<div style="text-align: center; color: var(--color-text-muted); padding: 20px;">No comments yet. Be the first to share your thoughts!</div>';
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        const currentUserId = user?.id;

        list.innerHTML = comments.map(comment => createCommentHTML(comment, currentUserId)).join('');
        
        // Add delete listeners
        document.querySelectorAll('.delete-comment-btn').forEach(btn => {
            btn.addEventListener('click', handleDeleteComment);
        });

    } catch (err) {
        console.error('Error loading comments:', err);
        list.innerHTML = '<div style="color: #ef4444; text-align: center;">Failed to load comments.</div>';
    }
}

function createCommentHTML(comment, currentUserId) {
    const date = new Date(comment.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const isOwner = currentUserId === comment.user_id;
    const deleteBtn = isOwner ? `<button class="delete-comment-btn" data-id="${comment.id}">Delete</button>` : '';
    
    // Default avatar if none provided
    const avatarUrl = comment.user_avatar || 'Media/default-avatar.png';

    return `
        <div class="comment-item" id="comment-${comment.id}">
            <img src="${avatarUrl}" alt="${comment.user_name}" class="comment-avatar">
            <div class="comment-content">
                <div class="comment-header">
                    <div>
                        <span class="comment-author">${escapeHtml(comment.user_name || 'Anonymous')}</span>
                        <span class="comment-date"> • ${date}</span>
                    </div>
                    ${deleteBtn}
                </div>
                <div class="comment-text">${escapeHtml(comment.content)}</div>
            </div>
        </div>
    `;
}

async function setupCommentListeners(postSlug) {
    const form = document.getElementById('comment-form');
    const authMessage = document.getElementById('comment-auth-message');
    
    // Check auth state
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        form.style.display = 'block';
        authMessage.style.display = 'none';
    } else {
        form.style.display = 'none';
        authMessage.style.display = 'block';
    }

    // Listen for auth changes
    supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
            form.style.display = 'block';
            authMessage.style.display = 'none';
        } else {
            form.style.display = 'none';
            authMessage.style.display = 'block';
        }
    });

    // Handle submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('comment-input');
        const content = input.value.trim();
        const btn = form.querySelector('button');

        if (!content) return;

        try {
            btn.disabled = true;
            btn.textContent = 'Posting...';

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            // Get user profile for name/avatar
            // Try to get from metadata first, then profiles table if needed
            const userName = user.user_metadata?.full_name || user.email.split('@')[0];
            const userAvatar = user.user_metadata?.avatar_url;

            const { error } = await supabase
                .from('comments')
                .insert({
                    post_slug: postSlug,
                    user_id: user.id,
                    content: content,
                    user_name: userName,
                    user_avatar: userAvatar
                });

            if (error) throw error;

            input.value = '';
            await loadComments(postSlug); // Reload list

        } catch (err) {
            console.error('Error posting comment:', err);
            alert('Failed to post comment. Please try again.');
        } finally {
            btn.disabled = false;
            btn.textContent = 'Post Comment';
        }
    });
}

async function handleDeleteComment(e) {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    const btn = e.target;
    const commentId = btn.dataset.id;
    const commentEl = document.getElementById(`comment-${commentId}`);

    try {
        btn.disabled = true;
        
        const { error } = await supabase
            .from('comments')
            .delete()
            .eq('id', commentId);

        if (error) throw error;

        // Remove from DOM
        commentEl.remove();
        
        // Check if list is empty
        const list = document.getElementById('comments-list');
        if (list.children.length === 0) {
            list.innerHTML = '<div style="text-align: center; color: var(--color-text-muted); padding: 20px;">No comments yet. Be the first to share your thoughts!</div>';
        }

    } catch (err) {
        console.error('Error deleting comment:', err);
        alert('Failed to delete comment.');
        btn.disabled = false;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
