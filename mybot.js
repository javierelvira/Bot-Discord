const Discord = require("discord.js");
const  client = new Discord.Client();
const config = require("./config.json");

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.on("ready", () => {
    console.log("Estoy listo!");
    client.user.setPresence( {
        status: "online",
        game: {
            name: "a Tu Madre",
            type: "WATCHING"
        }
    } );
 
});

var prefix = config.prefix;

client.on("message", (message) => {








    if(message.content.startsWith(prefix + 'help')){

        message.channel.send('**'+message.author.username+'**, Revisa tus mensajes privados.');
        message.author.send('**COMANDOS DE MYBOT**\n```\n'+
                            '-> '+prefix+'ping           :: Comprueba la latencia del bot y de tus mensajes.\n'+
                            '->  enano           :: Responde de forma educada.\n'+
                            '-> '+prefix+'avatar <@user> :: Muestra el avatar de un usuario.\n'+
                            '-> '+prefix+'join> :: Conecta el bot al canal de voz en el que estés.\n'+
                            '-> '+prefix+'leave> :: Desconecta el bot del canal de voz en el que esté.\n'+
                            '-> '+prefix+'user <@user>   :: Muestra información sobre un usuario mencioando.\n'+
                            '-> '+prefix+'electro   :: Reproduce una radio de electro.\n'+
                            '-> '+prefix+'rock   :: Reproduce una radio de rock.\n'+
                            '-> '+prefix+'MegaStar   :: Reproduce la radio MegaStar.\n'+
                            '-> '+prefix+'ban <@user>    :: Banear a un usuario del servidor.\n'+
                             '-> '+prefix+'hola           :: Retorna un saludo como mensaje.');
        
      }
      







    if (message.content.startsWith(prefix + "ping")) {
        message.channel.send("pung!");
    }

    if (message.content.startsWith(prefix + "hola")){
      message.channel.send("Hola que tal?");
    }

    if (message.content.startsWith("enano")){
        message.channel.send("Cállate Hobbit de mierda");
    }

  
    if(message.content.startsWith(prefix+"avatar")){  
           
            let img = message.mentions.users.first()
            if (!img) {
      
                const embed = new Discord.RichEmbed()
                .setImage(`${message.author.avatarURL}`)
                .setColor(0x66b3ff)
                .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
                message.channel.send({ embed });
      
            } else if (img.avatarURL === null) {
      
                message.channel.sendMessage("El usuario ("+ img.username +") no tiene avatar!");
      
            } else {
      
                const embed = new Discord.RichEmbed()
                .setImage(`${img.avatarURL}`)
                .setColor(0x66b3ff)
                .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
                message.channel.send({ embed });
      
            };
      
        }
        if(message.content.startsWith(prefix+"ban")){    
          
            let user = message.mentions.users.first();
            if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
            if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.');
            
        
            message.guild.member(user).ban();
            message.channel.send(`**${user.username}**, fue baneado del servidor`);
                    
      }
      

    if(message.content.startsWith(prefix+"user")){ 
      
        let userm = message.mentions.users.first()
        if(!userm){
          var user = message.author;
          
            const embed = new Discord.RichEmbed()
            .setThumbnail(user.avatarURL)
            .setAuthor(user.username+'#'+user.discriminator, user.avatarURL)
            .addField('Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true)
            .addField('ID', user.id, true)
            .addField('Estado', user.presence.status, true)
            .addField('Apodo', message.member.nickname, true)
            .addField('Cuenta Creada', user.createdAt.toDateString(), true)
            .addField('Fecha de Ingreso', message.member.joinedAt.toDateString())
            .addField('Roles', message.member.roles.map(roles => `\`${roles.name}\``).join(', '))
            .setColor(0x66b3ff)
            
           message.channel.send({ embed });
        }else{
          const embed = new Discord.RichEmbed()
          .setThumbnail(userm.avatarURL)
          .setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL)
          .addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
          .addField('ID', userm.id, true)
          .addField('Estado', userm.presence.status, true)
          .addField('Cuenta Creada', userm.createdAt.toDateString(), true)
          .setColor(0x66b3ff)
          
         message.channel.send({ embed });
        }} 
    if(message.content.startsWith(prefix+"join")){  
        
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
    }   

    if(message.content.startsWith(prefix+"leave")){  

        let Canalvoz = message.member.voiceChannel;
        if (!Canalvoz) {
            message.channel.send('No estoy en un canal de voz.');
        } else {
            message.channel.send('Dejando el canal de voz.').then(() => {
            Canalvoz.leave();
            }).catch(error => message.channel.send(error));
        }   
    }

    if(message.content.startsWith(prefix+"electro")){

        let voiceChannel = message.member.voiceChannel;
        if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
            voiceChannel.join().then(conexion =>{
            conexion.playStream('http://stream.electroradio.fm:80/192k/;');
            message.channel.send('Radio electro activado.')
            return;
          })
          .catch(console.error);
      }
      
    if(message.content.startsWith(prefix+"rock")){
      
        let voiceChannel = message.member.voiceChannel;
        if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
            voiceChannel.join().then(conexion =>{
            conexion.playStream('http://ample-zeno-15.radiojar.com/ahzy9avygyduv;');
            message.channel.send('Radio de rock activado.')
            return;
          })
          .catch(console.error);
      }

    if(message.content.startsWith(prefix+"MegaStar")){
      
        let voiceChannel = message.member.voiceChannel;
        if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
            voiceChannel.join().then(conexion =>{
            conexion.playStream('http://195.10.10.223/cope/megastar.mp3;');
            message.channel.send('Radio MegaStar activada.')
            return;
          })
          .catch(console.error);
      }


});
client.login(config.token);