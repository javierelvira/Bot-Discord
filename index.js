const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

function cambiarEstado(tipo, nombre) {
    client.user.setPresence({
        status: "online",
        game: {
            name: nombre,
            type: tipo
        }
    });
}

function separarEnLineas(...lineas) {
    return lineas.join("\n");
}

client.on("ready", () => {
    console.log("Estoy listo!");
    cambiarEstado("WATCHING", "a tu madre");
});

client.on("message", (message) => {
    let partes = message.content.split(' ');
    switch (partes[0].toLowerCase()) {
        case ".help": {
            message.channel.send(`**${message.author.username}**, Revisa tus mensajes privados.`);
            message.author.send(separarEnLineas(
                '**COMANDOS DEL BOT**',
                '```',
                '-> .ping           :: Comprueba la latencia del bot y de tus mensajes.',
                '-> .enano          :: Responde de forma educada.',
                '-> .avatar <@user> :: Muestra el avatar de un usuario.',
                '-> .join           :: Conecta el bot al canal de voz en el que estés.',
                '-> .leave>         :: Desconecta el bot del canal de voz en el que esté.',
                '-> .user <@user>   :: Muestra información sobre un usuario mencioando.',
                '-> .electro        :: Reproduce una radio de electro.',
                '-> .rock           :: Reproduce una radio de rock.',
                '-> .megastar       :: Reproduce la radio MegaStar.',
                '-> .ban <@user>    :: Banear a un usuario del servidor.',
                '-> .hola           :: Retorna un saludo como mensaje.',
                '```',
            ));

            break;
        }

        case ".ping": {
            message.channel.send("pung!");
            break;
        }

        case ".hola": {
            message.channel.send("Hola que tal?");
            break;
        }

        case ".enano": {
            message.channel.send("Cállate Hobbit de mierda");
            break;
        }

        case ".avatar": {
            let img = message.mentions.users.first()
            if (!img) {
                const embed = new Discord.RichEmbed()
                    .setImage(`${message.author.avatarURL}`)
                    .setColor(0x66b3ff)
                    .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
                message.channel.send({ embed });
    
            } else if (img.avatarURL === null) {
                message.channel.sendMessage(`El usuario (${img.username}) no tiene avatar!`);
            } else {
                const embed = new Discord.RichEmbed()
                    .setImage(`${img.avatarURL}`)
                    .setColor(0x66b3ff)
                    .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
                message.channel.send({ embed });
            };

            break;
        }

        case ".ban": {
            let user = message.mentions.users.first();
            if (message.mentions.users.size < 1) {
                return message.reply('Debe mencionar a alguien.').catch(console.error);
            }

            if (!message.guild.member(user).bannable) {
                return message.reply('No puedo banear al usuario mencionado.');
            }
    
            message.guild.member(user).ban();
            message.channel.send(`**${user.username}**, fue baneado del servidor`);

            break;
        }

        case ".user": {
            let userm = message.mentions.users.first()
            if (!userm) {
                var user = message.author;
    
                const embed = new Discord.RichEmbed()
                    .setThumbnail(user.avatarURL)
                    .setAuthor(user.username + '#' + user.discriminator, user.avatarURL)
                    .addField('Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true)
                    .addField('ID', user.id, true)
                    .addField('Estado', user.presence.status, true)
                    .addField('Apodo', message.member.nickname, true)
                    .addField('Cuenta Creada', user.createdAt.toDateString(), true)
                    .addField('Fecha de Ingreso', message.member.joinedAt.toDateString())
                    .addField('Roles', message.member.roles.map(roles => `\`${roles.name}\``).join(', '))
                    .setColor(0x66b3ff)
    
                message.channel.send({ embed });
            } else {
                const embed = new Discord.RichEmbed()
                    .setThumbnail(userm.avatarURL)
                    .setAuthor(userm.username + '#' + userm.discriminator, userm.avatarURL)
                    .addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
                    .addField('ID', userm.id, true)
                    .addField('Estado', userm.presence.status, true)
                    .addField('Cuenta Creada', userm.createdAt.toDateString(), true)
                    .setColor(0x66b3ff)
    
                message.channel.send({ embed });
            }

            break;
        }

        case ".join": {
            let Canalvoz = message.member.voiceChannel;
            if (!Canalvoz || Canalvoz.type !== 'voice') {
                message.channel.send('¡Necesitas unirte a un canal de voz primero!.').catch(error => message.channel.send(error));
            } else if (message.guild.voiceConnection) {
                message.channel.send('Ya estoy conectado en un canal de voz.');
            } else {
                message.channel.send('Conectando...').then(m => {
                    Canalvoz.join().then(() => {
                        m.edit(':white_check_mark: | Conectado exitosamente.').catch(error => message.channel.send(error));
                    }).catch(error => message.channel.send(error));
                }).catch(error => message.channel.send(error));
            }

            break;
        }

        case ".leave": {
            let Canalvoz = message.member.voiceChannel;
            if (!Canalvoz) {
                message.channel.send('No estoy en un canal de voz.');
            } else {
                message.channel.send('Dejando el canal de voz.').then(() => {
                    Canalvoz.leave();
                }).catch(error => message.channel.send(error));
            }
            break;
        }
        
        case ".electro": {
            let voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
            voiceChannel.join().then(conexion => {
                conexion.playStream('http://stream.electroradio.fm:80/192k/;');
                message.channel.send('Radio electro activado.')
                return;
            }).catch(console.error);
            break;
        }

        case ".rock": {
            let voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
            voiceChannel.join().then(conexion => {
                conexion.playStream('http://ample-zeno-15.radiojar.com/ahzy9avygyduv;');
                message.channel.send('Radio de rock activado.')
                return;
            }).catch(console.error);
            break;
        }

        case ".megastar": {
            let voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
            voiceChannel.join().then(conexion => {
                conexion.playStream('http://195.10.10.223/cope/megastar.mp3;');
                message.channel.send('Radio MegaStar activada.')
                return;
            }).catch(console.error);
            break;
        }
    }
});

client.login(config.token);