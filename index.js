const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');
const fs = require('fs');
const { createCanvas, registerFont, loadImage } = require('canvas');

dotenv.config();

const talkedRecently = new Set();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (!talkedRecently.has(msg.author.id)) {
        if (msg.content === '!padoru') {
            const width = 532
            const height = 311
            
            registerFont('./assets/Kanit/Kanit-ExtraBold.ttf', { family: 'Kanit', weight: '800' })
        
            const canvas = createCanvas(width, height)
            const context = canvas.getContext('2d')
        
            const padoruTemplate = await loadImage('./assets/padoru.png')
        
            context.drawImage(padoruTemplate, 0, 0);
        
            const today = new Date();
            const month  = today.toLocaleString('en-US', { month: 'short' });
            const day  = today.toLocaleString('en-US', { day: '2-digit' });
        
            context.textBaseline = 'top'
            context.fillStyle = '#770608'
            context.textAlign = 'center';
            context.font = 'normal normal bold 30px "Kanit"';
            
        
            context.save();
            // context.translate(canvas.width/2,canvas.height/2);
            context.rotate(-7*Math.PI/180);
        
            context.fillText(month, 85, 170)
            context.fillText(day, 85, 200)
        
            context.restore();
        
            const buffer = canvas.toBuffer('image/png')
            fs.writeFileSync('./temp/today.png', buffer)
            
            const attachment = new  Discord.MessageAttachment('./temp/today.png', 'today.png');
            const embed = new Discord.MessageEmbed()
             .attachFiles(attachment)
             .setImage('attachment://today.png');
            msg.reply({embed});
          }
        talkedRecently.add(msg.author.id);
        setTimeout(() => {
          talkedRecently.delete(msg.author.id);
        }, 20000);
    }
});

client.login(process.env.TOKEN);