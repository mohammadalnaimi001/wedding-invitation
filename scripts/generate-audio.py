"""Original instrumental invitation loop. Regeneration only; no runtime dependency."""
import numpy as np
import wave
import pathlib
import subprocess
sr=32000
duration=54
x=np.zeros((duration*sr,2),dtype=np.float64)
chords=[(50,57,62,65,69),(46,53,58,62,65),(53,60,65,69,72),(48,55,60,64,67)]*3
rng=np.random.default_rng(1602026)
def pluck(midi,start,amp,pan=.5,length=3.5):
 n=int(sr*length);t=np.arange(n)/sr;f=440*2**((midi-69)/12)
 attack=1-np.exp(-t*95)
 sig=(np.sin(2*np.pi*f*t)*np.exp(-t/1.2)+.25*np.sin(2*np.pi*2*f*t)*np.exp(-t/.55)+.08*np.sin(2*np.pi*3*f*t)*np.exp(-t/.27))*attack
 sig+=rng.normal(0,.005,n)*np.exp(-t/.025)
 offset=int(start*sr)
 for delay,level in [(0,1),(.16,.13),(.37,.09),(.63,.05)]:
  a=offset+int(delay*sr);b=min(a+n,len(x));l=b-a
  if l>0:x[a:b,0]+=sig[:l]*amp*level*np.sqrt(1-pan);x[a:b,1]+=sig[:l]*amp*level*np.sqrt(pan)
for bar,ch in enumerate(chords):
 for beat,index in enumerate([0,2,3,1,4,2]):pluck(ch[index],bar*4.5+beat*.75,.12,.35+beat%3*.15)
 if bar%2==1:
  for i,note in enumerate([74,72,69]):pluck(note,bar*4.5+i*1.5,.03,.6,2.7)
x*=np.minimum(np.arange(len(x))/(sr*1.5),1)[:,None]
x*=np.minimum((len(x)-np.arange(len(x)))/(sr*2.0),1)[:,None]
x/=max(np.max(np.abs(x)),1e-9);x*=.65
out=pathlib.Path(__file__).resolve().parents[1]/'public/audio'
out.mkdir(exist_ok=True)
p=out/'wedding.wav'
with wave.open(str(p),'wb') as f:f.setnchannels(2);f.setsampwidth(2);f.setframerate(sr);f.writeframes((x*32767).astype('<i2').tobytes())
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',str(p),'-codec:a','libmp3lame','-b:a','128k','-metadata','title=An Evening of Joy','-metadata','artist=Original invitation composition',str(out/'wedding.mp3')],check=True)
p.unlink()
print('Original 54-second instrumental loop generated.')
