// this is a discord bot that utilizes an unnecessary amount of functions to make the code shorter than it needs to be
const d = require('discord.js');
const c = new d.Client();
require("dotenv").config();

on('ready', () => {
	log('ready');
});

on('message', m => {
	var args = m.content.slice(1).split(/ +/);
	var cmd = args.shift().toLowerCase();
	switch (cmd) {
		case 'ban': {
			if (perms(m, 'BAN_MEMBERS')) {
				const memb = getMention(m);
				memb.ban();
				mcs(m, 'I have banned them! :)');
			}
			break;
		}
		case 'kick': {
			if (perms(m, 'KICK_MEMBERS')) {
				const memb = getMention(m);
				memb.kick();
				mcs(m, 'Successfully Kicked them!');
			}
			break;
		}
		case 'purge': {
			if (perms(m, 'MANAGE_MESSAGES')) {
				message.channel.bulkDelete(parseInt(message.content.slice(7)));
				mcs(m, '**Successfully Purged**');
			}
			break;
		}
		case 'mute': {
			if (perms(m, 'MANAGE_ROLES')) {
				const muteRole = findRole(m, 'Muted');
				const memb = getMention();
				memb.roles.add(muteRole);
			}
			break;
		}
		case 'unmute': {
			if (perms(m, 'MANAGE_ROLES')) {
				const muteRole = findRole(m, 'Muted');
				const memb = getMention(m);
				memb.roles.remove(muteRole);
			}
			break;
		}
	}
});

c.login(process.env.TOKEN);

// the various functions -------)

// client.on() shortener
function on(event, paramncode) {
	c.on(event, paramncode);
}
// checks the if the content includes a substring
function mcCheck(message, substring) {
	return message.content.includes(substring);
}
// finds a role
function findRole(message, rolename) {
	return message.guild.roles.cache.find(r => r.name === rolename);
}
function getMention(message) {
	return message.mentions.members.first();
}
// message.channel.send() shortener
function mcs(message, content) {
	return message.channel.send(`${content}`);
}
// easy logger
function log(stuff) {
	return console.log(stuff);
}
// checks for the **AUTHOR'S** perms
function perms(message, perm) {
	return message.member.permissions.has(perm);
}

// -------------------)
