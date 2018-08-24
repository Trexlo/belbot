const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const opus = require('opusscript');
const broadcast = client.createVoiceBroadcast();
const { Client, RichEmbed } = require('discord.js');
var cards=[
'p7','p8','p9','p10','pJ','pQ','pK','pA',
't7','t8','t9','t10','tJ','tQ','tK','tA',    
'h7','h8','h9','h10','hJ','hQ','hK','hA',
'k7','k8','k9','k10','kJ','kQ','kK','kA'
]

const priority=['A','10','K','Q','J','9','8','7'];
const calledPriority=['J','9','A','10','K','Q','8','7'];
var started=false;
var player=[];
var team=[];
team[0]=[];
team[1]=[];
var play=[];
player[0]=[];
player[1]=[];
player[2]=[];
player[3]=[];
player[4]=[];
player[5]=[];
var rnd=0;
var px=0;
var Omega = '\u2001';
var AString = "This     is     a      string";
var dotspace='';
var emb=null;
var cc=[];
cc[0]='-----';
cc[1]='';
function dot(){
    for(var i=0;i<80;i++){
        dotspace+=" ";
    }
}
dot();
var pl=0;
function found(type,num,plNum){
    console.log(plNum);
    var x=type+num.toUpperCase();
    console.log(x);
    console.log("arr "+player[pl]);
    for(var i=0;i<8;i++){
        if(player[plNum][i]==x){
            return true;
        }
    }
    return false;
}

function emojified(arr){
    var emoj=[];
    for(var i=0;i<arr.length;i++){
        emoj.push(em(arr[i].substring(0,1),arr[i].substring(1,arr[i].length)));
    }
    return emoj.toString().replace(/,/gi, ' || ');
}
function em(type, num){
    var t,n;
    if(type=='t'){t=':clubs:';}
    if(type=='p'){t=':spades:';}
    if(type=='h'){t=':hearts:';}
    if(type=='k'){t=':diamonds:';}
    if(num=='6'){n=':six:'}
    if(num=='7'){n=':seven:'}
    if(num=='8'){n=':eight:'}
    if(num=='9'){n=':nine:'}
    if(num=='10'){n=':keycap_ten:'}
    if(num=='J'){n=':regional_indicator_j:'}
    if(num=='Q'){n=':regional_indicator_q:'}
    if(num=='K'){n=':regional_indicator_k:'}
    if(num=='A'){n=':regional_indicator_a:'}
    return t+n;
}


var e=["█","█","█","█"];
function ext(msg,pl){
    var mess=msg.content.toLowerCase();
    var card=msg.content.substring(mess.indexOf(config.prefix+"t")+3,mess.length);
    var type=card[0];
    var num=card.substring(1,card.length);
    console.log(card+" "+num+" "+type+" - "+mess);
    msg.delete();
        if(found(type,num.toUpperCase(),pl))
        {
            if(pl>0){
                if((play[0].substring(0,1).toLowerCase()==type.toLowerCase() || type.toLowerCase==cc[1]) || (!find(player[pl], play[0].substring(0,1).toLowerCase()) && !find(player[pl], cc[1].toLowerCase()))){}
                else{
                    msg.channel.send("You must throw first thrown colour or a called colour");
                    return;
                }
            }

            e[pl]=em(type.toLowerCase(),num.toUpperCase());
            console.log("removed "+player[pl].splice(player[pl].indexOf((type+num.toUpperCase())), 1));
            player[5][pl].edit(emojified(player[pl]));
            play.push(type.toLowerCase()+num.toUpperCase());
            console.log("found e "+ e[pl]);
            pl++;
            rnd++;
        }
        else{
                msg.channel.send("You dont have that card!");
        }
       
        
        update();
    }
    /*
     embed.setDescription(
        `1---------------------------2
          |█`+e[0]+`█████████`+e[1]+`█|
          |██████████████|
          |█`+e[2]+`█████████`+e[3]+`█|
         3---------------------------4`);
   
    //embed.addField("p1",e);
    emb.edit(embed);
    */


function shuffle(){
    
    for(var i=0;i<32;i++){
        var rand= Math.floor((Math.random() * 31) + 0);
        var tmp = cards[i];
        cards[i]=cards[rand];
        cards[rand]=tmp;
    }
    console.log(cards);
}

function round(msg){
        const collector = new Discord.MessageCollector(msg.channel, m => !msg.author.bot) 
        console.log("round "+pl);
        msg.channel.send(player[4][pl]+" call?")
        collector.on('collect', message =>{
            console.log("round collector "+message.content);
            if(pl==3 && message.content.toLowerCase().startsWith(config.prefix+"pass") && cc[0]=='' && message.author.username==player[4][pl]){
                msg.channel.send(player[4][3]+" call?(must call)");
            }
            if(message.content.toLowerCase().startsWith(config.prefix+"pass")&& pl!=3 && cc[0]=='' && message.author.username==player[4][pl]){
                pl++;
                msg.channel.send(player[4][pl]+" call?")
            }else{
                if(message.content.toLowerCase().startsWith(config.prefix+"call") && cc[0]=='' && message.author.username==player[4][pl]){
                    console.log("call "+message.content.toLowerCase().substring(6,7));
                    if(message.content.toLowerCase().substring(6,7)=='t' ||message.content.toLowerCase().substring(6,7)=='p' ||message.content.toLowerCase().substring(6,7)=='h' ||message.content.toLowerCase().substring(6,7)=='k'){
                        //TODO called in embedS
                        console.log("ccccccccc "+message.content.toLowerCase().substring(6,7));
                        if(message.content.toLowerCase().substring(6,7)=='t'){
                            //cc[0]=client.emojis.find("name","clubs");
                            cc[0]=':clubs:'
                            cc[1]='t';
                            console.log("clubs"+ cc[0]);
                        }
                        if(message.content.toLowerCase().substring(6,7)=='p'){
                            //cc[0]=client.emojis.find("name","spades");
                            cc[0]=':spades:';
                            cc[1]='p';
                            console.log("spades"+ cc[0]);
                        }
                        if(message.content.toLowerCase().substring(6,7)=='h'){
                            //cc[0]=client.emojis.find("name","hearts");
                            cc[0]=':hearts:'
                            cc[1]='h';
                            console.log("hearts"+ cc[0]);
                        }
                        if(message.content.toLowerCase().substring(6,7)=='k'){
                            //cc[0]=client.emojis.find("name","diamonds");
                            cc[0]=':diamonds:'
                            cc[1]='k';
                            console.log("diamonds"+ cc[0]);
                        }
                        embed.addField('On turn',player[4][0], false);
                        update();
                        pl=0;
                        started=true;
                    }
                }
            }
            if(message.content.toLowerCase().startsWith(config.prefix+"t ") && started && message.author.username==player[4][pl]){
                console.log("extracting");
                ext(message,pl);
                
                if(pl==4){
                pl=0;
                }
                if(rnd==4){
                    win=[[],[],[],[]];
                    for(var i=0;i<play.length;i++){ 
                        win[i][0]=play[i];
                        win[i][3]=i;
                        if(play[i][0]==cc[1]){
                            win[i][1]=calledPriority.indexOf(play[i].substr(1,play[i].length));
                            win[i][2]=true;
                        }else{
                            if(play[i][0]==play[0][0]){
                                win[i][1]=priority.indexOf(play[i].substr(1,play[i].length));
                                win[i][2]=false;
                            }
                            else{
                                win[i][1]=99;  
                                win[i][2]=false;  
                            }
                        }
                        
                    }

                    for(var i=0;i<win.length;i++){
                        for(var j=i;j<win.length;j++){
                            if(win[i][2]<win[j][2]){
                                var tmp = win[j];
                                win[j]=win[i];
                                win[i]=tmp;
                            }else if(win[i][2]==win[j][2] && win[i][1]>win[j][1]){
                                var tmp = win[j];
                                win[j]=win[i];
                                win[i]=tmp;
                            }
                        }
                    }
                    if(win[0][3]=='0' || win[0][3]=='2' ){
                        team[0].concat(play);
                    }
                    if(win[0][3]=='1' || win[0][3]=='3' ){
                        team[1].concat(play);
                    }
                    pl=win[0][3];
                    rnd=0;
                    if(player[0].length==0 && player[1].length==0 && player[2].length==0 && player[3].length==0){
                        var teampoints=[];
                        var winteam;
                        var points;
                        teampoints[0]=score(team[0]);
                        teampoints[1]=score(team[1]);
                        if(teampoints[0]>teampoints[1]){
                            winteam=player[0]+' and '+player[2];
                            points=teampoints[0];
                        }
                        if(teampoints[0]<teampoints[1]){
                            winteam=player[1]+' and '+player[3];
                            points=teampoints[1];
                        }
                        embed.addField('The winner is '+ winteam, points, true);

                        update();
                        collector.stop();
                    }
                }
                
            }
        });
        
}

function score(team){
    var scr=0;
    for(var i = 0 ; i < team.length; i++){
        if(team[i].substring(1,team[i].length)=='A'){scr+=11;}
        if(team[i].substring(1,team[i].length)=='10'){scr+=10;}
        if(team[i].substring(1,team[i].length)=='K'){scr+=4;}
        if(team[i].substring(1,team[i].length)=='Q'){scr+=3;}
        if(team[i].substring(1,team[i].length)=='J' && team[i].substring(0,1)!=c[1] ){scr+=2;}
        if(team[i].substring(1,team[i].length)=='J' && team[i].substring(0,1)==c[1] ){scr+=20;}
        if(team[i].substring(1,team[i].length)=='9' && team[i].substring(0,1)==c[1] ){scr+=20;}
    }
    return scr;
}

function find(arr, x){
    for(var i=0;i<arr.length;i++){
        if(arr[i].includes(x)){
            return true;
        }
    }
    return false;
}

function deal(){
    player[0]=[];
    player[1]=[];
    player[2]=[];
    player[3]=[];
    player[4]=["Player 1","Player 2","Player 3","Player 4"];
    
    var x=0;
    for(var i=0;i<32;i++){
        player[x].push(cards[i]);
        if(x==3){x=0;}else{x++;}
        console.log(x);
        //console.log(player[x]);
    }
    for(var i=0;i<4; i++){
        for(var j=0;j<8; j++){
            for(var k=j+1; k<8;k++){
                if(player[i][j]<player[i][k]){
                    var tmp= player[i][k];
                    player[i][k]=player[i][j];
                    player[i][j]=tmp;
                }
            }
        }
    }
    console.log(player[0]);
    console.log(player[1]);
    console.log(player[2]);
    console.log(player[3]);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  for(card in cards){console.log(cards[card]);}
});

const embed = new RichEmbed()
const privEmbed = new RichEmbed()


function update(){/*
    embed.setDescription(
        player[4][0]+`---------------------------`+player[4][1]+`
          |█`+e[0]+`█████████`+e[1]+`█|
          |██████████████|
          |█`+e[2]+`█████████`+e[3]+`█|
         `+player[4][2]+`---------------------------`+player[4][3]);
   
    //embed.addField("p1",e);*/
    embed.fields[0].name=player[4][0];
    embed.fields[1].name=player[4][1];
    embed.fields[4].name=player[4][2];
    embed.fields[3].name=player[4][3];
    embed.fields[0].value=e[0];
    embed.fields[1].value=e[1];
    embed.fields[4].value=e[2];
    embed.fields[3].value=e[3];
    if(px!=3){
        console.log("waiton GOFR MPLETREYS")
        embed.fields[5].value=px+1+"/4";
    }else{
        console.log("called card "+cc[0]);
        embed.fields[5].name="Called card";
        if(cc[0]==''){embed.fields[5].value="None";}else{embed.fields[5].value=cc[0];}
    }
    if(started){
        embed.fields[6].name='Playing';
        embed.fields[6].value=player[4][pl];
    }

    emb.edit(embed);
}


client.on('message', msg => {
   // console.log(msg.member.displayName)
        function start(){
        player[5]=[];
        team[0]=[];
        team[1]=[];
        cc[0]='';
        cc[1]='';
        px=0;
        started=false;
        pl=0;
        shuffle();
        deal();
        emb=null;
        var twenty=`                    `;
        // We can create embeds using the MessageEmbed constructor
        // Read more about all that you can do with the constructor
        // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
      //  var img = new Image();
        //    img.src="./cards/h.png";
        embed
          // Set the title of the field
        ////.setTitle('p1---------------------------p2')
          // Set the color of the embed
        ////.setColor(0xFFFFFF)
          // Set the main content of the embed
          //.setDescription(dotspace+"\n"+"1"+" **:sob: "+" :sob: "+"2"+"\n"+dotspace)
        //  .addField("kek", "k    k    k    k")
        //4 spaces5
         /* .setDescription(
            `   1---------------------------2
                |██████████████|
                |██████████████|
                |██████████████|
                3---------------------------4`)
           */
          
            
            .addField('Player1', "card", true)
            .addField('Player2', "card", true)
            .addBlankField()
            .addField('Player4', "card", true)
            .addField('Player3', "card", true)
            .addField('Waiting for players', px+"/4", false);
          //.addBlankField()
         // .setDescription("nijesup"+twenty+"er")
        // Send the embed to the same channel as the message
        msg.channel.send(embed);
    }










    // If the message is "how to embed"
  if (msg.content === 'emb') {
      //update();
      /*cc[0]=client.emojis.find("name",'spades');
        console.log("spades"+ cc[0]);
        msg.channel.send(cc[0]);
  */
 var tmp=[];
 var tmp2=["l,","l","s","sy"];
 tmp=tmp.concat(tmp2);
    console.log(tmp);
}
  /*if(msg.content.startsWith("+t ")){
      ext(msg, 0);
  }*/

  if (msg.content === 'esmb') {
    var twenty=`                    `;
  // We can create embeds using the MessageEmbed constructor
  // Read more about all that you can do with the constructor
  // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
  embed
    // Set the title of the field
    .setTitle('kek..............a')
    // Set the color of the embed
    .setColor(0xFFFFFF)
    // Set the main content of the embed
    //.setDescription(dotspace+"\n"+"1"+" **:sob: "+" :sob: "+"2"+"\n"+dotspace)
  //  .addField("kek", "k    k    k    k")
  //4 spaces5
    .setDescription(
      `1---------------------------2
        |██████████████|
        |████████ssss██████|
        |██████████████|
        |██████████████|
       3---------------------------4`);
    //.addBlankField()
   // .setDescription("nijesup"+twenty+"er")
  // Send the embed to the same channel as the message
  emb.edit(embed);
}


  if(msg.author.bot && !emb){
      emb=msg;
      console.log(msg.author.bot);
      console.log(!emb);
      console.log(emb);
      console.log(emb.embeds[0]);
      console.log(embed);
    
  }
  //console.log(emb.embeds);
 /* if(msg.content.startsWith(config.prefix+"ee")){
      //emb.embeds.array()[0].description("sssssssss");
      //emb.edit("sssss");
     // emb.setDescription("sss");
     console.log(player[5][0]);
     player[5][0].edit("ss");

  }
 */
 
/*    if(msg.content.startsWith("xae")){

    }
*/
    if(msg.content.toLowerCase()==config.prefix+"start" && !started){
        start();
        px=-1;
        console.log("entering");
            const collector = new Discord.MessageCollector(msg.channel, m => !msg.author.bot)
         
            collector.on('collect', message =>{
                console.log("collect");
            if(message.content.toLowerCase().startsWith(config.prefix+"p") && !message.content.toLowerCase().startsWith(config.prefix+"pass") ){
                if(find(player, message.member.displayName)){
                    message.channel.send("You are already playing!")
                    message.delete(2000);
                }else{
                    px++;
                if(px==4){message.channel.send("full");}
                    //ext(message);
                else{
                    player[4][px]=message.member.displayName;

      //  console.log();
                    //player[5][px]=message.author.send(player[px].toString());
                    //console.log(player[5][px]);
                    //console.log("sent to "+message.author);
                   // player[5][px]=message.author.createDM();
                    console.log(message.author.createDM().then(value=>{
                        const filter = m => m.author.bot;
                        const collector = value.createMessageCollector(filter);
                        collector.on('collect', m => {
                            console.log(m);    
                            player[5].push(m);
                            collector.stop();
                            console.log(player[5][px]);
                        }  
                     );
                        
  /*                      privEmbed
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 
.addField('Player1', "card", true)
.addField('Player2', "card", true)
.addBlankField()
.addField('Player4', "card", true)
.addField('Player3', "card", true)
.addField('Waiting for players', px+"/4", false)
.addField("Your Cards",emojified(player[px]),false );


embed.fields[0].name=player[4][0];
    embed.fields[1].name=player[4][1];
    embed.fields[4].name=player[4][2];
    embed.fields[3].name=player[4][3];
    embed.fields[0].value=e[0];
    embed.fields[1].value=e[1];
    embed.fields[4].value=e[2];
    embed.fields[3].value=e[3];
    if(px!=3){
        console.log("waiton GOFR MPLETREYS")
        embed.fields[5].value=px+1+"/4";
    }else{
        console.log("called card "+cc[0]);
        embed.fields[5].name="Called card";
        if(cc[0]==''){embed.fields[5].value="None";}else{embed.fields[5].value=cc[0];}
    }
    if(started){
        embed.fields[6].name='Playing';
        embed.fields[6].value=player[4][pl];
    }










*/
                        //xxxxxxxxxxxxxxxxxxxxxxxxxx
                      
                        value.send(emojified(player[px]));
                       // value.send(privEmbed);
                        
                        console.log(emojified(player[px]))
                        console.log(px);
                        //console.log(player[5][0]);
                    }))
                    console.log("mess "+player[5][px]);
                    //console.log(player[5][0]);
                   // player[5][px].send(player[px].toString());
                   
                    update();
                    if(px==3){
                        pl=0;
                        round(msg);
                    }
                }
                message.delete(2000);
            }
            
            }
            
        });
    }

    

    console.log(msg.channel.id);

  
    if(msg.author.bot && msg.content=="You are already playing!"){msg.delete(2000)}
    if(msg.author.bot && msg.content=="full"){msg.delete(2000)}
    if(msg.author.bot && msg.content=="You dont have that card!"){msg.delete(2000)}
});

client.login(config.token);
