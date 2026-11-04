"""Repères des sous-titres (.srt) : mêmes découpes que les plaques du film. python tools/subs.py out/cues.json"""
import json, sys, subprocess, os
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
lib = os.environ.get('LIB', os.path.expanduser('~/lemo-opuscar'))
js = """const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('http://127.0.0.1:8765/index.html');await p.waitForFunction(()=>window.READY,null,{timeout:180000});
console.log(JSON.stringify(await p.evaluate(()=>window.SUBCUES)));await b.close();})();"""
srv = subprocess.Popen([sys.executable, '-m', 'http.server', '8765', '--bind', '127.0.0.1'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
try:
    import time; time.sleep(0.8)
    r = subprocess.run(['node', '-e', js], capture_output=True, text=True)
    if r.returncode: sys.exit(r.stderr[-800:])
    out = r.stdout
finally:
    srv.terminate()
cues = [{'t0': c['t0'], 't1': c['t1'], 'text': c['text'].replace(' ', ' ')} for c in json.loads(out)]
json.dump(cues, open(sys.argv[1], 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(cues), 'sous-titres')
