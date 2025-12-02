
import { supabase } from './supabase.js';

const commentsSectionHTML = `
<div class="comments-container" style="max-width: 800px; margin: 64px auto; padding: 0 24px;">
    <h3 style="font-family: 'Playfair Display', serif; font-size: 28px; margin-bottom: 32px;">Comments</h3>
    
    <div id="comments-list" style="display: flex; flex-direction: column; gap: 24px; margin-bottom: 48px;">
        <!-- Comments will be loaded here -->
        <p style="color: #666; font-style: italic;">Loading comments...</p>
    </div>
    
    <div id="comment-form-container" style="background: #f8f9fa; padding: 32px; border-radius: 16px;">
        <h4 style="font-size: 20px; margin-bottom: 16px;">Leave a Comment</h4>
        <form id="comment-form">
            <textarea id="comment-input" placeholder="Share your thoughts..." required
                style="width: 100%; padding: 16px; border: 1px solid #ddd; border-radius: 8px; min-height: 120px; font-family: 'Inter', sans-serif; resize: vertical; margin-bottom: 16px;"></textarea>
            <button type="submit" class="btn-primary" style="border: none; cursor: pointer;">Post Comment</button>
        </form>
        <div id="login-to-comment" style="display: none; text-align: center;">
            <p style="margin-bottom: 16px;">Please log in to leave a comment.</p>
            <button onclick="window.openAuthModal()" class="btn-secondary">Log In</button>
        </div>
    </div>
</div>
`;

export async function initComments() {
    // Inject HTML
    const article = document.querySelector('article') || document.querySelector('.blog-content') || document.querySelector('.container');
    if (!article) return; // Only run on pages with content
    
    // Find a good place to insert. Ideally after the content.
    // In blog posts, usually inside <article> at the end.
    article.insertAdjacentHTML('beforeend', commentsSectionHTML);
    
    const commentsList = document.getElementById('comments-list');
    const commentForm = document.getElementById('comment-form');
    const loginPrompt = document.getElementById('login-to-comment');
    const postSlug = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Check Auth State
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
        commentForm.style.display = 'block';
        loginPrompt.style.display = 'none';
    } else {
        commentForm.style.display = 'none';
        loginPrompt.style.display = 'block';
    }
    
    // Fetch Comments
    await loadComments(postSlug, commentsList);
    
    // Handle Submit
    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const content = document.getElementById('comment-input').value;
        
        if (!content.trim()) return;
        
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        
        // Optimistic UI update
        const tempComment = createCommentElement({
            content,
            created_at: new Date().toISOString(),
            user_email: user.email,
            user_metadata: user.user_metadata
        });
        commentsList.prepend(tempComment);
        document.getElementById('comment-input').value = '';
        
        // Save to DB
        const { error } = await supabase
            .from('comments')
            .insert({
                post_slug: postSlug,
                user_id: user.id,
                content: content,
                user_email: user.email, // Storing email for display simplicity
                user_metadata: user.user_metadata // Storing avatar etc
            });
            
        if (error) {
            console.error('Error posting comment:', error);
            tempComment.remove();
            alert('Failed to post comment. Please try again.');
        }
    });
}

async function loadComments(slug, container) {
    const { data: comments, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_slug', slug)
        .order('created_at', { ascending: false });
        
    if (error) {
        console.error('Error loading comments:', error);
        container.innerHTML = '<p>Error loading comments.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    if (comments.length === 0) {
        container.innerHTML = '<p style="color: #666;">No comments yet. Be the first!</p>';
        return;
    }
    
    comments.forEach(comment => {
        container.appendChild(createCommentElement(comment));
    });
}

function createCommentElement(comment) {
    const div = document.createElement('div');
    div.style.cssText = 'display: flex; gap: 16px; padding-bottom: 24px; border-bottom: 1px solid #eee;';
    
    const avatarUrl = comment.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${comment.user_email}&background=random`;
    const date = new Date(comment.created_at).toLocaleDateString();
    
    div.innerHTML = `
        <img src="${avatarUrl}" alt="User" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;">
        <div>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                <span style="font-weight: 600;">${comment.user_email.split('@')[0]}</span>
                <span style="font-size: 0.85rem; color: #999;">${date}</span>
            </div>
            <p style="line-height: 1.5; color: #333;">${escapeHtml(comment.content)}</p>
        </div>
    `;
    return div;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Init
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initComments);
}
