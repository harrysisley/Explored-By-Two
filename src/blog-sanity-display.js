import { client, urlFor } from './sanity.js';

async function fetchSanityPosts() {
    const container = document.getElementById('sanity-posts-container');
    if (!container) return;

    try {
        const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)`);
        
        if (posts.length === 0) {
            container.innerHTML = '<p class="text-center">No posts found in Sanity yet. Add one in the Studio!</p>';
            return;
        }

        container.innerHTML = posts.map(post => `
            <article class="blog-card fade-up" style="display: flex;">
                <div class="blog-card-image">
                    ${post.mainImage ? `<img src="${urlFor(post.mainImage).width(400).url()}" alt="${post.title}" class="card-img">` : '<div class="card-img" style="background: #eee; height: 100%;"></div>'}
                    <span class="blog-category">Latest from Sanity</span>
                </div>
                <div class="blog-card-content">
                    <div class="blog-meta">
                        <span class="blog-date">${new Date(post._createdAt).toLocaleDateString()}</span>
                    </div>
                    <h2 class="blog-title">${post.title}</h2>
                    <p class="blog-excerpt">${post.excerpt || 'Read our latest story managed via Sanity.'}</p>
                    <div class="blog-footer">
                        <span class="blog-link">Read Story →</span>
                    </div>
                </div>
            </article>
        `).join('');
    } catch (error) {
        console.error('Error fetching from Sanity:', error);
        container.innerHTML = '<p class="text-center" style="color: red;">Failed to load Sanity posts. Check console!</p>';
    }
}

document.addEventListener('DOMContentLoaded', fetchSanityPosts);
