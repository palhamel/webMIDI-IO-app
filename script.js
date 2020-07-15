if (!("requestMIDIAccess" in navigator)) {
  console.log('☹️ WebMIDI is not supported in this browser.')
  document.body.innerHTML = `<h1>:-/</h1><p>I'm sorry, but your browser does not support the WebMIDI API ☹️🚫🎹</p>`;
} else {
  console.log('🙌🏻 YES, happy days! This browser supports WebMIDI!');
}

navigator.requestMIDIAccess()
  .then((access) => {
    console.log('midi access:', access);
    const inputs = access.inputs;
    const outputs = access.outputs;
    const inputText = [];
    const outputText = [];
    
    access.onstatechange = function(e) {
      // MIDI controller:
      console.log('Hardware:', e.port.name, e.port.manufacturer, '<<STATE>>',e.port.state);
      // console.log('check e.port:', e.port)
    };
    // INPUTS:
    inputs.forEach((midiInput) => { 
      inputText.push(` FOUND: ${midiInput.name} // `);
        midiInput.onmidimessage = function(message) {                  
          document.querySelector("#messages").innerText +=  `# ${midiInput.name}
        ${new Date()}
        ==================
        - Status: ${message.data[0]}
        - Data 1: ${message.data[1]}
        - Data 2: ${message.data[2]}
        ==================\n\n`;
        }
    })
    // OUTPUTS:
    outputs.forEach((midiOutput) => { 
      outputText.push(` FOUND: ${midiOutput.name} is: ${midiOutput.state} //`);
      // console.log('midiOutput', midiOutput)
    })
      
    document.querySelector("#inputs").innerText = inputText.join('');
    document.querySelector("#outputs").innerText = outputText.join('');  
 
  });

