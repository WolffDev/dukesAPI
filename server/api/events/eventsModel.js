const pool = require('../../config/ddMemberPool');

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

exports.get = (offset) => {
	return queryData(`
		SELECT 
			id,
			event,
			time_from,
			time_to
		FROM 
			event
		WHERE
			time_from
		ORDER BY
			time_from DESC
		LIMIT 
			4
		OFFSET 
			?
		`,
		offset
	)
}

exports.findById = (eventId) => {
	return queryData(`
		SELECT
			e.event,
			e.time_from,
			e.time_to,
			es.seat,
			CONCAT(m.name, ' ', m.surname) AS name,
			m.email,
			m.nickname, 
			m.username, 
			m.netpass, 
			m.lan_ip, 
			dun.name AS discord_name
		FROM
			event e
		LEFT JOIN 
			event_signup es
		ON 
			e.id = es.event_id
		LEFT JOIN 
			member m
		ON 
			es.member_id = m.id
		LEFT JOIN 
		discordDukesMember as ddm
		ON 
			m.id = ddm.member_id
		LEFT JOIN 
			discordUsername as dun
		ON 
			ddm.discord_id = dun.id
		WHERE
			m.email IS NOT NULL
		AND
			e.id = ?
		`,
		eventId
	)
}

exports.eventAmount = (eventId) => {
	return queryData(`
		SELECT 
			COUNT(*) AS attendeeAmount 
		FROM 
			event_signup 
		WHERE 
			event_id = ?
		`,
		eventId
	)
}