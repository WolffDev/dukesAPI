const pool = require('../../config/ddPool');

function queryData(q, data = []) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if(err){
				connection.release();
				reject(err);
			}
			connection.query(q, data, (err, results, fields) => {
				connection.release();
				if(err) reject(err);
				resolve(results);
			})
		})
	})
}

exports.getAllBySlug = (slug, limit = 5, offset = 0) => {
	return queryData(`
		SELECT
			wp_posts.ID AS postId,
			wp_posts.post_date AS date,
			wp_posts.post_title AS title,
			wp_posts.post_excerpt AS excerpt,
			wp_posts.post_content AS content,
			wp_users.ID AS authorId,
			wp_users.user_nicename AS nickname,
			wp_users.display_name AS author
		FROM 
			wp_posts
		LEFT JOIN 
			wp_term_relationships 
		ON 
			(wp_posts.ID = wp_term_relationships.object_id)
		LEFT JOIN 
			wp_term_taxonomy 
		ON 
			(wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id)
		LEFT JOIN 
			wp_terms 
		ON 
			(wp_term_taxonomy.term_id = wp_terms.term_id)
		LEFT JOIN 
			wp_users 
		ON 
			(wp_posts.post_author = wp_users.ID)
		WHERE 
			wp_terms.slug IN (?)
		AND 
			wp_posts.post_status = 'publish'
		GROUP BY 
			wp_posts.ID
		ORDER BY
			date DESC
		LIMIT
			?
		OFFSET
			?
		
		`, 
		[slug, limit, offset]
	)
} 