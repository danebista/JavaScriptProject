
class Wave {

  constructor(game,waveJson) {
    this.game=game;
    this.waveJson=waveJson;
    this.enemyId=[0,0];
    this.referenceTime=this.game.gameTime+this.waveJson.waveIncrement;
    this.spawnOver=false;
  }

  run() {

      while(this.game.gameTime>this.referenceTime && !this.spawnOver){
        if(this.enemyId[0]<this.waveJson.packets.length){
          if(this.enemyId[1]<this.waveJson.packets[this.enemyId[0]].num){
            this.game.enemies.push(this.enemySelector(this.game,this.waveJson.packets[this.enemyId[0]].enemy))
            this.referenceTime+=this.waveJson.packets[this.enemyId[0]].enemyIncrement
            this.enemyId[1]+=1
          }else{
            this.referenceTime+=this.waveJson.packets[this.enemyId[0]].packetIncrement
            this.enemyId[1]=0
            this.enemyId[0]+=1
          }
        }else{
          this.spawnOver=true
          break
        }
      }

  }
  isWaveOver() {
    if(!this.game.enemies[0] && this.spawnOver){
      return true
    }else{
      return false
    }
  }
    //parses JSON
    enemySelector(game,enemyJSON) {
        var args=[null,game].concat(enemyJSON.additionalEnemyArguments)
        var tempEnemy= enemyJSON.enemy.bind.apply(enemyJSON.enemy,args)
        return new tempEnemy

    }
}
var classEnemies=[Enemy1,Enemy2,Enemy3,Enemy4,Enemy5];
function WaveGenerator(Waver,n,classEnemies,number,enemyIncrement,packetIncrement,waveIncrement){
  Waver.push({});
  Waver[Waver.length-1].packets=[];
  Waver[Waver.length-1].name=`wave ${Waver.length}`;
  Waver[Waver.length-1].waveIncrement=waveIncrement;
  for(var i=0;i<n;i++){
   Waver[Waver.length-1].packets.push({});
  }
  for(var j=0;j<Waver[Waver.length-1].packets.length;j++){
    Waver[Waver.length-1].packets[j].enemy={};
    Waver[Waver.length-1].packets[j].enemy.enemy=classEnemies[j];
    Waver[Waver.length-1].packets[j].enemy.additionalEnemyArguments=[1];
    Waver[Waver.length-1].packets[j].num=number[j];
    Waver[Waver.length-1].packets[j].enemyIncrement=enemyIncrement[j];
    Waver[Waver.length-1].packets[j].packetIncrement=packetIncrement[j];
  }
}
var AllWaves=[];
var n=3;
var n2=5;
var number=[10,15,1],
 number2=[10,1,3],
 number3=[10,5,1],
 number4=[1,1,1,1,1],
 number5=[1,50,110,70,60],
 number6=[66,660,60,660,6660],
 number7=[1,500,500,1000,1000],
 number8=[1000000,10000000,1000000,100000,10000000];
var enemyIncrement=[1,1,1],
  enemyIncrement2=[1,0.25,0.75],
  enemyIncrement3=[10,5,1],
  enemyIncrement4=[0.01,0.01,0.01,0.01,0.01],
  enemyIncrement5=[0.05,0.25,0.2,0.2,0.2],
  enemyIncrement6=[0.006,0.06,0.6,0.06,0.6],
  enemyIncrement7=[0.07,0.005,0.7,0.005,0,005],
  enemyIncrement8=[0.000001,0.000001,0.00001,0.000001,0.00001];
var packetIncrement=[1,1,1],
packetIncrement2=[0.01,0.01,0.01,0.01,0.01],
packetIncrement3=[1,1,1,1,1],
packetIncrement4=[2,2,2,3,3],
packetIncrement5=[1,1,1,1,1];
packetIncrement6=[1,1,1,1,1];
var waveIncrement=3,
    waveIncrement2=7,
    waveIncrement3=6,
    waveIncrement4=0,
    waveIncrement5=10;

WaveGenerator(AllWaves,n,classEnemies,number,enemyIncrement,packetIncrement,waveIncrement);
WaveGenerator(AllWaves,n,classEnemies,number2,enemyIncrement2,packetIncrement,waveIncrement2);
WaveGenerator(AllWaves,n,classEnemies,number3,enemyIncrement3,packetIncrement,waveIncrement2);
WaveGenerator(AllWaves,n,classEnemies,number3,enemyIncrement,packetIncrement,waveIncrement3);
WaveGenerator(AllWaves,n,classEnemies,number3,enemyIncrement3,packetIncrement,waveIncrement3);
WaveGenerator(AllWaves,n,classEnemies,number3,enemyIncrement3,packetIncrement,waveIncrement3);
WaveGenerator(AllWaves,n2,classEnemies,number4,enemyIncrement4,packetIncrement2,waveIncrement3);
WaveGenerator(AllWaves,n2,classEnemies,number5,enemyIncrement5,packetIncrement3,waveIncrement4);
WaveGenerator(AllWaves,n2,classEnemies,number6,enemyIncrement6,packetIncrement4,waveIncrement);
WaveGenerator(AllWaves,n2,classEnemies,number7,enemyIncrement7,packetIncrement5,waveIncrement2);
WaveGenerator(AllWaves,n2,classEnemies,number8,enemyIncrement8,packetIncrement5,waveIncrement5);

/*AllWaves=[
  {
    "packets":[
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy1,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":10,
        "enemyIncrement":1,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy2,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":15,
        "enemyIncrement":1,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy3,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":1,
        "enemyIncrement":1,
        "packetIncrement":1
      }
    ],
    "name":"wave 1",
    "waveIncrement":3
  },
  {
    "packets":[
      {
        "enemy":{
          "enemy":Enemy1,
          "additionalEnemyArguments":[
            1
          ]
        },
        "num":10,
        "enemyIncrement":.25,
        "packetIncrement":2
      },
      {
        "enemy":{
          "enemy":Enemy3,
          "additionalEnemyArguments":[
            0
          ]
        },
        "num":3,
        "enemyIncrement":.75,
        "packetIncrement":1
      }
    ],
    "name":"wave 2",
    "waveIncrement":10
  },
  {
    "packets":[
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy1,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":10,
        "enemyIncrement":1,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy2,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":5,
        "enemyIncrement":1,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy3,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":1,
        "enemyIncrement":1,
        "packetIncrement":1
      }
    ],
    "name":"wave 3",
    "waveIncrement":10
  },
  {
    "packets":[
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy1,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":10,
        "enemyIncrement":1,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy2,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":5,
        "enemyIncrement":1,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy3,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":1,
        "enemyIncrement":1,
        "packetIncrement":1
      }
    ],
    "name":"wave 4",
    "waveIncrement":6
  },
  {
    "packets":[
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy1,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":10,
        "enemyIncrement":1,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy2,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":5,
        "enemyIncrement":1,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy3,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":1,
        "enemyIncrement":1,
        "packetIncrement":1
      }
    ],
    "name":"wave 5",
    "waveIncrement":6
  },
  {
    "packets":[
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy1,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":10,
        "enemyIncrement":1,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy2,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":5,
        "enemyIncrement":1,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy3,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":1,
        "enemyIncrement":1,
        "packetIncrement":1
      }
    ],
    "name":"wave 6",
    "waveIncrement":6
  },
  {
    "packets":[
      {
        "enemy":{
          "enemy":Enemy1,
          "additionalEnemyArguments":[
            1
          ]
        },
        "num":1,
        "enemyIncrement":.01,
        "packetIncrement":.01
      },
      {
        "enemy":{
          "enemy":Enemy2,
          "additionalEnemyArguments":[
            1
          ]
        },
        "num":1,
        "enemyIncrement":.01,
        "packetIncrement":.01
      },
      {
        "enemy":{
          "enemy":Enemy3,
          "additionalEnemyArguments":[
            1
          ]
        },
        "num":1,
        "enemyIncrement":.01,
        "packetIncrement":.01
      },
      {
        "enemy":{
          "enemy":Enemy4,
          "additionalEnemyArguments":[
            1
          ]
        },
        "num":1,
        "enemyIncrement":.01,
        "packetIncrement":.01
      },
      {
        "enemy":{
          "enemy":Enemy5,
          "additionalEnemyArguments":[
            0
          ]
        },
        "num":1,
        "enemyIncrement":.01,
        "packetIncrement":.01
      }
    ],
    "name":"wave 7",
    "waveIncrement":6
  },
  {
    "packets":[
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy2,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":600,
        "enemyIncrement":.03*5,
        "packetIncrement":3
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy1,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":100,
        "enemyIncrement":.05,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy3,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":100,
        "enemyIncrement":.1,
        "packetIncrement":1
      }
    ],
    "name":"wave-8",
    "waveIncrement":6
  },
  {
    "packets":[
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy4,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":120,
        "enemyIncrement":.05,
        "packetIncrement":3
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy5,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":60,
        "enemyIncrement":.025,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy1,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":70,
        "enemyIncrement":.2,
        "packetIncrement":1
      }
    ],
    "name":"Io0K aT tHe5E",
    "waveIncrement":0
  },
  {
    "packets":[
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy1,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":6660,
        "enemyIncrement":.006,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy2,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":660,
        "enemyIncrement":.06,
        "packetIncrement":2
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy3,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":60,
        "enemyIncrement":.6,
        "packetIncrement":3
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy2,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":660,
        "enemyIncrement":.06,
        "packetIncrement":2
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy1,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":6660,
        "enemyIncrement":.006,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy3,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":66660,
        "enemyIncrement":.006,
        "packetIncrement":1
      }
    ],
    "name":"SATAN'S LEVEL",
    "waveIncrement":0
  },
  {
    "packets":[
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy1,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":1,
        "enemyIncrement":10,
        "packetIncrement":10
      }
    ],
    "name":"super hard level",
    "waveIncrement":10
  },
  {
    "packets":[
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy4,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":500,
        "enemyIncrement":.07,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy3,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":500,
        "enemyIncrement":.07,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy4,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":1000,
        "enemyIncrement":.005,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy3,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":1000,
        "enemyIncrement":.005,
        "packetIncrement":1
      },
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy4,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":2000,
        "enemyIncrement":.003,
        "packetIncrement":1
      }
    ],
    "name":"8",
    "waveIncrement":7
  },
  {
    "packets":[
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy5,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":100000,
        "enemyIncrement":.001,
        "packetIncrement":0
      }
    ],
    "name":"lol?",
    "waveIncrement":2
  },
  {
    "packets":[
      {
        "enemy":{//this specifies the information about the enemy
          "enemy":Enemy5,
          "additionalEnemyArguments":[//
            1
          ]
        },
        "num":1000000,
        "enemyIncrement":.0001,
        "packetIncrement":0
      }
    ],
    "name":"lol.",
    "waveIncrement":2
  },
  {
    "packets":[
      {
        "enemy":{
          "enemy":Enemy5,
          "additionalEnemyArguments":[
            1
          ]
        },
        "num":Infinity,
        "enemyIncrement":.000001,
        "packetIncrement":1
      },
      {
        "enemy":{
          "enemy":Enemy,
          "additionalEnemyArguments":[
            0
          ]
        },
        "num":10,
        "enemyIncrement":1,
        "packetIncrement":1
      }
    ],
    "name":"infinite wave",
    "waveIncrement":30,
    "info":"this wave should always be the last wave"
  }
]
*/