// Actual game UI samples. No audio is fetched/decoded before visitor opt-in.
type Kind='select'|'confirm'|'back'|'page'|'open';
const sources:Record<Kind,string>={select:'/persona/cursor.wav',confirm:'/persona/decision.wav',back:'/persona/cancel.wav',page:'/persona/page.wav',open:'/persona/menu.wav'};
let context:AudioContext|undefined;
let lastPlayed=0;
let generation=0;
const buffers=new Map<string,Promise<AudioBuffer>>();
let playing:AudioBufferSourceNode|undefined;
export async function playTone(kind:Kind) {
  if(performance.now()-lastPlayed<65) return;
  lastPlayed=performance.now();
  const ticket=++generation;
  context??=new AudioContext();
  if(context.state!=='running') await context.resume();
  const audioContext=context;
  const path=sources[kind];
  if(!buffers.has(path)) buffers.set(path,fetch(path).then(response=>{
    if(!response.ok) throw new Error('Interface sound unavailable');
    return response.arrayBuffer();
  }).then(bytes=>audioContext.decodeAudioData(bytes)));
  const buffer=await buffers.get(path)!;
  if(ticket!==generation) return;
  playing?.stop();
  const sample=audioContext.createBufferSource();
  const volume=audioContext.createGain();
  volume.gain.value=.24;
  sample.buffer=buffer;sample.connect(volume).connect(audioContext.destination);
  sample.onended=()=>{sample.disconnect();volume.disconnect();if(playing===sample) playing=undefined;};
  playing=sample;sample.start();
}

export function stopSounds(){generation++;try{playing?.stop();}catch{}playing=undefined;}
