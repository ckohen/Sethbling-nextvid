/*
Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

    http://aws.amazon.com/apache2.0/

or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
    
    This file is what connects to chat and parses messages as they come along. The chat client connects via a 
    Web Socket to Twitch chat. The important part events are onopen and onmessage.
*/

var chatClient = function chatClient(options){
    this.username = options.username;
    this.password = options.password;
    this.channel = options.channel;

    this.server = 'irc-ws.chat.twitch.tv';
    this.port = 443;
}

chatClient.prototype.open = function open(){
    this.webSocket = new WebSocket('wss://' + this.server + ':' + this.port + '/', 'irc');

    this.webSocket.onmessage = this.onMessage.bind(this);
    this.webSocket.onerror = this.onError.bind(this);
    this.webSocket.onclose = this.onClose.bind(this);
    this.webSocket.onopen = this.onOpen.bind(this);
};

chatClient.prototype.onError = function onError(message){
    console.log('Error: ' + message);
};

/* This theoretically responds with the next three videos given the command !nextvid [current vid number]

The list of vid names comes first
*/
vidList = ["Half Billion Views Livestream", "[56:30] Zelda: BotW Speedrun Personal Best", "Zelda BotW ~1.5hr Speedrun Route", "Zelda BotW -- Great Plateau to Final Boss in 12min", "Super Brawl Builder on Minecade -- w/Mindcrackers", "Super Brawl Builder on Minecade -- Rematch w/Setho & AntSparklez", "Super Brawl Builder on Minecade -- w/Setho & AntSparklez", "SMW Credits Warp -- Easy Setup", "Mindcrack Secret Santa 2016 -- Day 8", "Atari 2600 Emulator in Minecraft [Technical Version]", "Atari 2600 Emulator in Minecraft", "Building Game 1.11 -- Retro Games", "Castle Siege Add-On Demo for Minecraft PE/Win10 0.16", "The Building Game 1.11 -- Memes", "The Building Game 1.11 -- War", "The Building Game 1.11 -- Autumn", "Mindcrack Ultra Hardcore S26 -- Twitch Announcement Video", "Mindcrack Ultra Hardcore S25E09 -- Finale", "Mindcrack Ultra Hardcore S25E08 -- Portal", "Mindcrack Ultra Hardcore S25E07 -- Green", "Mindcrack Ultra Hardcore S25E06 -- To Hell and Back", "Mindcrack Ultra Hardcore S25E05 -- Being Shot At", "Mindcrack Ultra Hardcore S25E04 -- Apocalypse", "Mindcrack Ultra Hardcore S25E03 -- Burn Her!", "Mindcrack Ultra Hardcore S25E02 -- Thunderous", "Mindcrack Ultra Hardcore S25E01 -- At the Portal", "Item Counter Doorway -- Super Minecraft Maker Redstone Tutorial", "Tooth Fairy -- Super Minecraft Maker Level Showcase", "TNT Olympics -- Super Minecraft Maker Level Showcase", "Redstone Tips from Moon Base Alpha", "Moon Base Alpha -- Super Minecraft Maker Level Showcase", "Mindcrack Ultra Hardcore S24E07 -- Finale", "Super Minecraft Maker -- Public Beta", "Mindcrack Ultra Hardcore S24E06 -- Shrinking", "Mindcrack Ultra Hardcore S24E05 -- Skirmish", "Mindcrack Ultra Hardcore S24E04 -- Spiderbros", ""Mindcrack Ultra Hardcore S24E03 -- Dungeons, Dungeons Everywhere"", "Mindcrack Ultra Hardcore S24E02 -- Caver's Undelight", "Mindcrack Ultra Hardcore S24E01 -- Heightened", "[9:39] 11 Exit Code Injection Speedrun in Super Mario World", "[1:20.65] Super Mario World 0 Exit Former World Record", "Mindcrack Ultra Hardcore S23E05 -- The Thrilling Conclusion", "[1:26.90] Super Mario World 0-Exit Former World Record", "Mindcrack Ultra Hardcore S23E04 -- Enchanted", "[1:47.0]Super Mario World Credits Warp Personal Best", "Mindcrack Ultra Hardcore S23E03 -- Sighting", "Mindcrack Ultra Hardcore S23E02 -- Team Maximum Damage", "Mindcrack Ultra Hardcore S23E01 -- For Real This Time", "Mindcrack Ultra Hardcore S:(E?", "SNES Code Injection -- Flappy Bird in SMW", "Disappearing Pistons in Minecraft 1.9", "Redstone Bank System in Minecraft", "Super Mario World Kill Bowser World Record (6:55.0)", "BASIC Programming Language in Minecraft", "Mario Maker Ep 14: AGDQ Killbox", "#BlingBuild Minecraft: Story Mode Competition Results", "Fast Build from Minecraft: Story Mode in Minecraft", "Mindcrack Secret Santa -- Day 13", "Scrabble Spell Checker in Minecraft", "The New Minecraft Cape for Realms Contributors", "The Incredible Machine 3 -- Livestream Highlights", "Verizon Web Browser and Video Calling in Minecraft (w/ CaptainSparklez)", "Disco Mario -- Super Mario World Powerup Incrementation Glitch", "Mario Maker Ep 13: One-Screen Puzzle #5", "Mario Maker Ep 12: One-Screen Puzzle #4", "Mindcrack Marathon #3 + Personal Update", "Super Mario World Credits Warp (Safe Route)", "Minecraft Snapshot 15w41a -- WINGS and Boat Overhaul", "Mario Maker Ep 11: One-Screen Puzzle #3", "Mario Maker Ep 10: Open the Floodgates", "Mario Maker Ep 9: One-Screen Puzzle #2", "Mario Maker Ep 8: One-Screen Puzzle #1", "Anki Overdrive -- AI Battle-Racing Game", "Mario Maker Ep 7: Mario and the Beanstalk", "Mario Maker Ep 6: Gravity Swap Ghost House", "Mario Maker Ep 5: Bumper Jumper", "Mario Maker Ep 4: Ice Breaker", "Mario Maker Ep 3: 6 Shells", "MindCrack Ultra Hardcore -- S22E10: Finale", "Mario Maker Ep 2: Mario Goes to Space", "Mario Maker Ep 1: Auto-music and Bouncy Castle", "MindCrack Ultra Hardcore -- S22E09: Centered", "MindCrack Ultra Hardcore -- S22E08: The Hunt is On", "MindCrack Ultra Hardcore -- S22E07: Final Touch", "MindCrack Ultra Hardcore -- S22E06: Gold Block", "MindCrack Ultra Hardcore -- S22E05: Recipe Problems", "MindCrack Ultra Hardcore -- S22E04: Nether Pains", "MindCrack Ultra Hardcore -- S22E03: Less Than Golden", "MindCrack Ultra Hardcore -- S22E02: Golden", "MindCrack Ultra Hardcore -- S22E01: Throwback", "Minecraft Snapshot 15w34c -- Attack Speed and Damage Changes", "Minecraft Snapshot 15w34a -- New Command Block Types and Attack Strength Meter", "Minecraft Kinect Charades w/Etho, Guude & CaptainSparklez", "Minecraft Snapshot 15w31a Overview -- Dual Wielding, Shulkers, Enderdragon Updates and New Arrows", "Motivational Armor Stand", "My Magic: The Gathering 45-Card Minecraft Set", "Minecon 2015 Speedrun Race -- Diversity 2 Feat. AntVenom and qMagnet", "Minecon 2015 Speedrun Race -- Any% Set Seed Glitchless Feat. AntVenom", "Minecon London Vlog", "Super MarI/O Kart Commentary/Stream Highlights", "MindCrack Ultra Hardcore -- S21E07: The Hunt", "MindCrack Ultra Hardcore -- S21E06: Noodly", "MindCrack Ultra Hardcore -- S21E05: Johnny Appleseed", "MindCrack Ultra Hardcore -- S21E04: NInja", "MindCrack Ultra Hardcore -- S21E03: Striking Gold", "MindCrack Ultra Hardcore -- S21E02: Dungeons Galore", "MindCrack Ultra Hardcore -- S21E01: Soulmate", "MarI/O Followup: Super Mario Bros, Donut Plains 4, and Yoshi's Island 1", "MarI/O - Machine Learning for Video Games", "Splatoon in Minecraft w/Friends", "Splatoon in Minecraft", "Agar.io in Minecraft", "Weeping Angel Mobs in Minecraft", "Snake in Minecraft v2.0", "Gravity Gun in Minecraft", "Laser Beams in Minecraft", "3D Graphing in Minecraft", "Chopsticks in Minecraft", "[Sold Out] MindCrack Party in London on July 3", "Monkey Ball in Minecraft", "Typewriter in Minecraft", "Unicycle in Minecraft", "Minigun in Minecraft", "Enhanced Falling in Minecraft", "Ghast Bows in 3 Simple Command Blocks -- Minecraft Tutorial", "Splash-Potion Arrows in Minecraft", "Waterfall Effects in Minecraft", "Camera w/Perspective in Minecraft", "Jack in the Box v2.0 in Minecraft", "Creepy Endermen Stare in Minecraft", "NoClip for Creative Mode in Minecraft", "Homing Guardian Missiles in Minecraft", "Slime Lava Lamp in Minecraft", "Swing Set in Minecraft", "New Creeping Vines Mob in Minecraft", "Roulette Wheel in Minecraft 2.0", "Pig-Powered Crane in Minecraft", "Gas Bombs in Minecraft", "Pocket Sand in Minecraft", "Dice in Minecraft", "SethBling Plays MindCrack -- S5E16: Hot Lava", "Hand-Crank Furnace -- Minecraft Command Block Creation", "Mobs to Blocks -- Minecraft Command Block Creation", "SethBling Plays MindCrack -- S5E15: Droppers Galore", "SethBling Plays MindCrack -- S5E14: The Cave", "The Building Game -- Spring Edition", "Minecraft Credits Warp in 3:07 [APRIL FOOLS]", "Minecraft Speedrun in 16:28 -- Any% Glitchless Set Seed", "Minecraft Speedrun -- Any% Glitchless, Fixed Seed in 18:13", "MEGA-Pick -- Minecraft Tomfoolery", "The Dress in Minecraft", "MindCrack Ultra Hardcore -- S20E05: To the Portal!", "MindCrack Ultra Hardcore -- S20E04: To the Surface!", "Super Mario World -- Credits Warp Tool-Assisted Speedrun (Human Theory)", "MindCrack Ultra Hardcore -- S20E03: To the Overworld!", "MindCrack Ultra Hardcore -- S20E02: To the Nether!", "Super Mario World -- Credits Warp in 1:49.6 -- Former Personal Best", "MindCrack Ultra Hardcore -- S20E01: To the Plateau!", "Super Mario World -- Credits Warp in 3:07.2 (Former World Record)", "Super Mario World -- Credits Warp in 3:53.9 (Former World Record)", "Credits Warp...Kind of?", "Super Mario World -- 4:49.8 Former World Record Speedrun w/Credits Warp Glitch", "Super Mario World -- Credits Warp in 5:59.6 (First Time Ever on Console)", "Livestream -- Learning SMW Credits Warp Glitch", "SethBling's AGDQ '15 Vlog", "Livestream -- Hacking the Super Mario World Stair Clip", "Super Mario World Tool-Assisted Speedrun (Human Theory) in 9:39.1", "MindCrack Ultra Hardcore -- S19E09: Interdimensional Standoff", "Livestream -- Creating a Frame-Perfect Speedrun for Super Mario World", "MindCrack Ultra Hardcore -- S19E08: Cornered", "Aimbot in Minecraft", "MindCrack Ultra Hardcore -- S19E07: Potion Party", "MindCrack Ultra Hardcore -- S19E06: Deserted", "Dreidel in Minecraft", "MindCrack Ultra Hardcore -- S19E05: SETHBLING! SETHBLING!", "MindCrack Ultra Hardcore -- S19E04: Popping Noises", "MindCrack Ultra Hardcore -- S19E03: Infinite Skeletons", "MindCrack Ultra Hardcore -- S19E02: The Mystery of the Orb", "Livestream -- Learning a new Super Mario World speedrun category", "MindCrack Ultra Hardcore -- S19E01: Bewitched", "Minecraft Gameband Unboxing", "Free Arrows! -- Minecraft Science", "How to Make a Furnace TNT Time Bomb in Minecraft", "Self-Reviving Skeleton Rider in Minecraft", "Missile Wars on PlayMindCrack -- RNGsus Take the Wheel!", "Missile Wars on PlayMindCrack -- The Sword Fight", "The Building Game -- Thanksgiving Edition", "Hungry Hungry Zombies -- Minecraft Minigame", "Minecraft Mob Music Maker", "Whack-a-Fowl AKA Minecraft Whack-a-Mole", "Livestream -- Super Mario World SUPER Casual Speedruns and Missile Wars", "Human Tetris in Minecraft (aka Hole in the Wall)", "SethBling Plays MindCrack -- S5E13: World Border PvP", "Missile Wars -- Experimental Platform Item on PlayMindCrack", "Missile Wars on PlayMindCrack -- Two Short Matches", "Missile Wars on PlayMindCrack -- Unhelpful Teammates", "Missile Wars on PlayMindCrack w/MindCrack Crew", "Livestream -- Missile Wars on us.playmindcrack.com", "Dominoes in Minecraft", "Real Time Graphing in Minecraft", "Haunted Gravestones in Minecraft", "Missile Wars w/MindCrack -- Ride the Missile", "Missile Wars Match with The Building Game Crowd", "Livestream -- Missile Wars Release!", "Missile Wars by Cubehamster and SethBling", "Coming Soon: Missile Wars by Cubehamster and SethBling", "GPS Directions in Minecraft", "Livestream -- MindCrack: Cleaning Up the ZedBlinger Tower Prank", "Instant Replay in Minecraft"];
vidList.append["The Building Game -- Movie Quotes", "Floating Island Maker in Minecraft", "SethBling's Gold Play Buddon", "Magic Carpets in Minecraft", "MindCrack Ultra Hardcore -- S18E07: High Ground", "Roomba in Minecraft", "MindCrack Ultra Hardcore -- S18E06: Lucky Break", "The Rude Sandstorm -- Minecraft Nonsense", "MindCrack Ultra Hardcore -- S18E05: Half Village", "Hourglass in Minecraft", "MindCrack Ultra Hardcore -- S18E04: Sighting", "Chair & Dining Table in Minecraft", "MindCrack Ultra Hardcore -- S18E03: Tactical", "Minecraft 2 by Microsoft (Early Access Beta Test)", "MindCrack Ultra Hardcore -- S18E02: Gear", "Infinite Rollercoaster in Minecraft", "MindCrack Ultra Hardcore -- S18E01: Cavers", "Easy Painting Chooser in Minecraft", "Security Cameras in Minecraft", "Super Mario World Speedrun 9:58.88 Personal Best @ MindCrack Marathon", "Livestream -- MindCrack Marathon UHC and Building Game", "SethBling Plays MindCrack -- S5E12: Rules That Matter", "The Building Game - 1.8 Beta Test", "MindCrack 24-Hour Charity Marathon -- We did it!", "Livestream -- MindCrack Server: Building the Glue Factory and Super Mario World Speedruns", "If People Were Beach Balls", "The Building Game -- PAX Prime Edition", "Livestream -- PAX Recap w/Pause & Super Mario World Speedrun De-rust & Races", "The Building Game -- Upside-Down Edition", "Drinking Bird in Minecraft", "Livestream -- Super Mario World Speedruns and Races", "Sponsored Livestream -- UHC on dgpvp.com", "Livestream -- WarioWare: Smooth Moves. Mario Kart Wii, 15 Seconds Speedruns, MindCrack Server", "Livestream -- Super Mario World Sub-10 Attempts", "Livestream -- Super Mario World Sub-10 Minute Attempts", "LiveStream -- Super Mario World Speedruns", "Livestream -- Super Mario Speedruns", "SethBling -- MindCrack Goings-On and Super Mario World Speedruns", "Minecraft Macarena (10 Hour Version)", "Minecraft Macarena", "Minecraft Sculptures with Armor Stands", "Livestream -- Creative Minecraft Fine Arts", "SethBling Plays MindCrack -- S5E11: Wither Fight", "SethBling Plays MindCrack -- S5E10: Creeper Head", "Livestream -- MindCrack Server Shenanigans", "Minecraft Snapshot 14w32a Overview -- Armor Stands, Colored Beacons and Red Sandstone", "SethBling Plays MindCrack -- S5E09: Electrified Creeper Field", "SethBling Plays MindCrack -- S5E08: Nether Fortress", "Livestream -- On the MindCrack Server", "The Building Game -- Historical Events", "SethBling Plays MindCrack -- S5E07: Lightning Creeper Experiment", "Livestream -- MindCrack Derping, Super Mario World Speedruns, and Vechs Race for Wool Invitational", "Super Mario World Speedrun -- Any% Personal Best@10:05.4 -- w/Vechs", "SethBling Plays MindCrack -- S5E06: My Apartment", "SethBling Plays MindCrack -- S5E05: World Border Science", "SethBling Plays MindCrack -- S5E04: Parking Garage", "Minecraft Snapshot 14w30b Overview -- Banners, Graphics Optimizations and More!", "SethBling Plays MindCrack -- S5E03: New Projects", "SethBling Plays MindCrack -- S5E02: Setting Up", "Livestream -- MindCrack Season 5 Grand Opening!!", "SethBling Plays MindCrack -- S5E01: World Border", "Livestream -- Extended Self-Guided MindCrack Tour", "SethBling Plays MindCrack -- S4E23: Final Server Tour", "The Building Game -- 20 Blocks Edition", "MindCrack Ultra Hardcore -- S17E06: Nebris", "MindCrack Ultra Hardcore -- S17E05: Spot Check", "Lucky Rabbit's Foot in Minecraft", "MindCrack Ultra Hardcore -- S17E04: LOVE ME", "MindCrack Ultra Hardcore -- S17E03: Thunder", "Pinball in Minecraft", "MindCrack Ultra Hardcore -- S17E02: Sprawling Lava", "Beautiful Katamari Speedrun Former World Record (54:20) Livestream", "MindCrack Ultra Hardcore -- S17E01: All By My Lonesome", "Minecraft Snapshot 14w27a Overview -- BUNNIES!!", "Active Camouflage in Minecraft", "Suck It Up -- Minecraft Puzzle Map", "Minecraft Snapshot 14w26b Overview", "Super Mario World Speedrun Commentary -- Personal Best 10:15.3 -- The Cloud", "SethBling Plays MindCrack -- S4E22: Building my UHC Monument Statue", "Earth to Echo Minigame w/CaptainSparklez & Aureylian", "Minecraft Snapshot 14w25a Overview -- Underwater Dungeons!", "The Building Game -- Dads Edition", "Attack Helicopter in Minecraft", "Minecraft Mega Blocks -- Ep 9: Diamond Ore and Baby Pig", "Livestream -- Super Mario World Speedruns", "Livestream -- Mario on a real SNES Console", "Super Mario World Speedrun Commentary -- 11:02 Personal Best Time", "Item Levelling System in Minecraft", "Minecraft Livestream -- Building an Item Levelling System", "Livestream -- Super Mario World Any% Speedruns (with Orb)", "Sonic Rings in Minecraft", "Pizza Spleef Server -- Play now on Minecade!", "SethBling Livestream -- Super Mario World Speedruns", "The Building Game -- Opposites", "MindCrack Ultra Hardcore -- S16E05: The Clash", "SethBling Plays MindCrack -- S4E21: Pin the Phone on the Guude", "MindCrack Ultra Hardcore -- S16E04: The Great Bow Hunt", "SethBling Livestream on the MindCrack Server", "Connect the Dots in Minecraft", "MindCrack Ultra Hardcore -- S16E03: Untimely Demise", "Magic Nether Portal in Minecraft", "MindCrack Ultra Hardcore -- S16E02: Precious Metals", "MindCrack Ultra Hardcore -- S16E01: Border Patrol", "Stargate in Minecraft", "SethBling LiveStream -- Building Paintball", "SethBling Plays MindCrack -- S4E20: Cactus Demolition", "Speed Reading in Minecraft", "Minecraft Snapshot 14w20a Overview -- Title Command and Cave Generation", "The Building Game -- Moms Edition", "Sand Juggling Wave in Minecraft Snapshot 14w19a", "Damage Tint for Minecraft Custom Maps", "Minecraft Snapshot 14w19a Overview", "Player-Controlled Flying Machine in Minecraft Snapshot 14w18b", "Quintuple Storage-Minecart Swapper -- Minecraft Redstone Device", "Storage-Minecart Swapper -- Minecraft Redstone Device", "360� TNT Multi-Cannon in Minecraft Snapshot 14w18b", "Compacter Slime Drawbridge in Minecraft Snapshot 14w18b", "Slime Drawbridge in Minecraft Snapshot 14w18a", "Tentacle Sand Shop in Minecraft Snapshot 14w18a", "Long Range Dispensers in Minecraft Snapshot 14w18a", "Piston Sandwave in Minecraft Snapshot 14w18a", "Minecraft Scattershot Cannon", "Minecraft Snapshot 14w18a Overview -- Sticky Slime Block Pistons", "Redstone-Powered Underground Base Entrance -- Minecraft Device", "The Building Game -- Songs Edition", "Minecraft Mega Blocks -- Ep 8: Cake and Ender Chests", "Minecraft Snapshot 14w17a Overview -- Custom Terrain Generation", "Zelda Spin Attack in Minecraft", "Nearly Undetectable Minecraft Death Trap with Carpet + Redstone Ore", "Minecraft Mega Blocks -- Ep 7: Villager, Slime Block and Cauldron", "2048 in Minecraft", "Bejeweled in Minecraft", "BlingHoops -- Minecraft Bukkit Plugin", "BlingGrapplingHook -- Minecraft Bukkit Plugin", "UHC Map Making Tutorial", "MindCrack Ultra Hardcore -- S15E03: Did you hear that?", "Goat Simulator in Minecraft", "MindCrack Ultra Hardcore -- S15E02: Get it Together", "BlingTrees -- Minecraft Bukkit Plugin", "MindCrack Ultra Hardcore -- S15E01: Temple Trouble", "Minecraft Snapshot 14w14a Overview (APRIL FOOLS)", "BlingCombat -- Minecraft Bukkit Plugin", "BlingParachute -- Minecraft Bukkit Plugin", "Dog Playing Fetch in Minecraft", "BlingBall -- Minecraft Bukkit Plugin", "BlingHomingArrows -- Minecraft Bukkit Plugin", "BlingPickpocket -- Minecraft Bukkit Plugin", "BlingGravity -- Minecraft Bukkit Plugin", "The Building Game -- St. Patrick's Edition", "Mirror in Minecraft", "Zelda Bombs in Minecraft", "SethBling Vlogs -- Upcoming Conventions", "Minecraft Snapshot 14w11a Overview -- Endermites and Faster Minecarts", "Minecraft MOBA Proof of Concept", "Ambulance in Minecraft", "Minecraft Village Builder", "Minecraft Snapshot 14w10a Overview", "Pok� Ball in Minecraft", "(?�?�??? ??? in Minecraft", "Rolling the Dice in Minecraft", "Light Cycle Minigame in Minecraft", "The Building Game -- Creeper Curling", "Pickpocketing in Minecraft", "MindCrack Ultra Hardcore -- S14E05: Sneaking Suspicion", "MindCrack Ultra Hardcore -- S14E04: The Wall", "Midas Touch in Minecraft", "MindCrack Ultra Hardcore -- S14E03: Creepers gonna Creep", "Minecraft Snapshot 14w07a Overview", "MindCrack Ultra Hardcore -- S14E02: Bling & Bling", "MindCrack Ultra Hardcore -- S14E01: Swedish Seth", "Minecraft Speedometer", "Minecraft Custom Map: 15 Seconds -- SethBling's 1.5M sub special", "Minecraft Snapshot 14w06a Overview", "Item Frame Combo Lock -- Minecraft Tutorial", "SethBling Plays MindCrack -- S4E19: Super Bowl Sunday", "Bite-Sized Minecraft 3", "Minecraft Snapshot 14w05a Overview -- Spectator Mode and Barrier Blocks", "Iron Golem Drummer -- Minecraft Nonsense", "Mario P-Switch in Minecraft", "Minecraft Snapshot 14w04a Overview -- Villager AI, Particle Command, Item Frame Redstone", "Iron Golem Wave in Minecraft", "Invisible Mansion -- Minecraft Prototype", "Tile Sliding Puzzle in Minecraft", "Minecraft Snapshot 14w03a Overview -- Clone and Fill Commands, Layered Skins", "Magicka Spell System in Minecraft", "Claw Game in Minecraft", "Explosive Projectiles -- Minecraft Mapmaking Trick", "Minecraft Snapshot 14w02b Overview -- Slime Blocks, Enchant Overhaul, Stone Blocks & Commands", "Invisible Ink in Minecraft", "Explode - Minecraft MCEdit Filter", "The Midnight Battle of Twin Peaks -- Minecraft PvP Map", "Mob Fireworks - Minecraft MCEdit Filter", "MindCrack Ultra Hardcore -- S13E08: Finale", "Minecraft Flying Machine"];

chatClient.prototype.onMessage = function onMessage(message){
    if(message !== null){
        var parsed = this.parseMessage(message.data);

        if(parsed !== null){
            var res = parsed.split(" ", 2);
            if(res[0] === "!nextvid"){
                if(res[1] !== null){
                    vidNumber = Number(res[1])
                    chatClient.say("The next three videos are:");
                    chatClient.say(vidList[vidNumber-2]);
                    chatClient.say(vidList[vidNumber-3]);
                    chatClient.say(vidList[vidNumber-4]);
                }
                else{
                    chatClient.say("The command format is !nextvid {currentVidNumber}");
                }
            } 
        }
    }
};

chatClient.prototype.onOpen = function onOpen(){
    var socket = this.webSocket;

    if (socket !== null && socket.readyState === 1) {
        console.log('Connecting and authenticating...');

        socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
        socket.send('PASS ' + this.password);
        socket.send('NICK ' + this.username);
        socket.send('JOIN ' + this.channel);
    }
};

chatClient.prototype.onClose = function onClose(){
    console.log('Disconnected from the chat server.');
};

chatClient.prototype.close = function close(){
    if(this.webSocket){
        this.webSocket.close();
    }
};

/* This is an example of an IRC message with tags. I split it across 
multiple lines for readability. The spaces at the beginning of each line are 
intentional to show where each set of information is parsed. */

//@badges=global_mod/1,turbo/1;color=#0D4200;display-name=TWITCH_UserNaME;emotes=25:0-4,12-16/1902:6-10;mod=0;room-id=1337;subscriber=0;turbo=1;user-id=1337;user-type=global_mod
// :twitch_username!twitch_username@twitch_username.tmi.twitch.tv 
// PRIVMSG 
// #channel
// :Kappa Keepo Kappa

chatClient.prototype.parseMessage = function parseMessage(rawMessage) {
    var parsedMessage = {
        message: null,
        tags: null,
        command: null,
        original: rawMessage,
        channel: null,
        username: null
    };

    if(rawMessage[0] === '@'){
        var tagIndex = rawMessage.indexOf(' '),
        userIndex = rawMessage.indexOf(' ', tagIndex + 1),
        commandIndex = rawMessage.indexOf(' ', userIndex + 1),
        channelIndex = rawMessage.indexOf(' ', commandIndex + 1),
        messageIndex = rawMessage.indexOf(':', channelIndex + 1);

        parsedMessage.tags = rawMessage.slice(0, tagIndex);
        parsedMessage.username = rawMessage.slice(tagIndex + 2, rawMessage.indexOf('!'));
        parsedMessage.command = rawMessage.slice(userIndex + 1, commandIndex);
        parsedMessage.channel = rawMessage.slice(commandIndex + 1, channelIndex);
        parsedMessage.message = rawMessage.slice(messageIndex + 1);
    }

    if(parsedMessage.command !== 'PRIVMSG'){
        parsedMessage = null;
    }

    return parsedMessage;
}

/* Builds out the top 10 leaderboard in the UI using a jQuery template. */
function buildLeaderboard(){
    var chatKeys = Object.keys(localStorage),
        outputTemplate = $('#entry-template').html(),
        leaderboard = $('.leaderboard-output'),
        sortedData = chatKeys.sort(function(a,b){
            return localStorage[b]-localStorage[a]
        });

    leaderboard.empty();

    for(var i = 0; i < 10; i++){
        var viewerName = sortedData[i],
            template = $(outputTemplate);

        template.find('.rank').text(i + 1);
        template.find('.user-name').text(viewerName);
        template.find('.user-points').text(localStorage[viewerName]);

        leaderboard.append(template);
    }
}