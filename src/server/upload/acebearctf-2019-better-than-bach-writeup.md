# Better than Bach

[relax.pcap](https://drive.google.com/file/d/1DHghUrnt5-ofMqSuBPksmoXmWpZQ0JYi/view?usp=sharing)

we're provided with a pcap file contains `USB_BULK` packets. It looks like this in Wireshark:

![wireshark](https://i.imgur.com/8qyqUoQ.png)

Since [Bach](https://en.wikipedia.org/wiki/Johann_Sebastian_Bach) is the name of a famous classical musician, we can guess that, there're packets from USB-MIDI device. Googling around, we found some documents:

- <https://github.com/colxi/midi-parser-js/wiki/MIDI-File-Format-Specifications>
- <http://www.onicos.com/staff/iz/formats/midi-event.html>
- <https://www.usb.org/sites/default/files/midi10.pdf> (Chapter: USB-MIDI Event Packets)

So, in the pcap file, there're midi events. Ex. the first packet's data is: `09903c3a` mean:

```
09: Event Note-on
90: Chan 1 Note on
3c: Note C4 (no. 60) on keyboard
3a: Velocity = 58
```

and so on. With this info, we can re-construct the "original" midi file. Export all packets to CSV (file `midi.csv`) and use [python-midi](https://github.com/vishnubob/python-midi) to create midi file with this script:

```python
import midi

# midi note table copy from internet
notes = {"21": "A0", "22": "A#0", "23": "B0", "24": "C1", "25": "C#1", "26": "D1", "27": "D#1", "28": "E1", "29": "F1", "30": "F#1", "31": "G1", "32": "G#1", "33": "A1", "34": "A#1", "35": "B1", "36": "C2", "37": "C#2", "38": "D2", "39": "D#2", "40": "E2", "41": "F2", "42": "F#2", "43": "G2", "44": "G#2", "45": "A2", "46": "A#2", "47": "B2", "48": "C3", "49": "C#3", "50": "D3", "51": "D#3", "52": "E3", "53": "F3", "54": "F#3", "55": "G3", "56": "G#3", "57": "A3", "58": "A#3", "59": "B3", "60": "C4", "61": "C#4", "62": "D4", "63": "D#4", "64": "E4", "65": "F4", "66": "F#4", "67": "G4", "68": "G#4", "69": "A4", "70": "A#4", "71": "B4", "72": "C5", "73": "C#5", "74": "D5", "75": "D#5", "76": "E5", "77": "F5", "78": "F#5", "79": "G5", "80": "G#5", "81": "A5", "82": "A#5", "83": "B5", "84": "C6", "85": "C#6", "86": "D6", "87": "D#6", "88": "E6", "89": "F6", "90": "F#6", "91": "G6", "92": "G#6", "93": "A6", "94": "A#6", "95": "B6", "96": "C7", "97": "C#7", "98": "D7", "99": "D#7", "100": "E7", "101": "F7", "102": "F#7", "103": "G7", "104": "G#7", "105": "A7", "106": "A#7", "107": "B7", "108": "C8"}

# Instantiate a MIDI Pattern (contains a list of tracks)
pattern = midi.Pattern()
# Instantiate a MIDI Track (contains a list of MIDI events)
track = midi.Track()
# Append the track to the pattern
pattern.append(track)

with open("midi.csv", "r") as f:
    for idx, line in enumerate(f.readlines()):
        x = line.strip().split(",")[7][1:-1]
        # print(x)
        note = notes[str(int(x[4:6], 16))]
        velocity = int(x[6:8], 16)
        note = note.replace("#", "s_")
        if len(note) == 2:
            note = "_".join(list(note))
        print note, velocity, chr(velocity)

        if x[2:4] == "90":
            on = midi.NoteOnEvent(tick=25, velocity=20, pitch=eval("midi.%s" % note))
            track.append(on)
        else:
            off = midi.NoteOffEvent(tick=25, pitch=eval("midi.%s" % note))
            track.append(off)

    eot = midi.EndOfTrackEvent(tick=1)
    track.append(eot)
    # Print out the pattern
    print pattern
    # Save the pattern to disk
    midi.write_midifile("out.mid", pattern)
```

What next? Midi files always remind me of [Synthesia](https://www.youtube.com/watch?v=EhB78Pi5P70), a software that visualize notes on piano. May be, we can do the same :D.

Upload created midi file to <https://onlinesequencer.net/import>, and zoomed out:

![flag](https://i.imgur.com/TOxPcj5.jpg)

Flag: `AceBear{fromUSBtoMIDIart}`

# The End

Shout-out to [AceBear Team](https://www.facebook.com/acebear.vn/) for organizing this CTF!