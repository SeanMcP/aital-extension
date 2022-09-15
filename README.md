# Am I Talking A Lot?

## Tasks

1. Establish a baseline for class list
   - Mute your microphone, find the class list, and then unmute your microphone?
2. Create map of participants to ticks
3. Set up an interval
4. Establish a unique identifier for each participant
   - `[data-self-name].textContent`
   - Can we assume that the order of the participants is the same? Second screen?
5. Query document for participants
   - `[data-second-screen=false]`
6. Compare class list to baseline
7. If match, increment count for individual
8. Update interface

## Twosies

- Chat buddy: `[data-second-screen="false"]`
- You: `[data-use-tooltip="true"]`
  1. Outline
  2. Icon

## Nice-to-haves

- Truncate names
- Change progress bar color based on percentage
  - Start shaking when it gets above X%

## Issues

### Unreliable DOM updates when you are talking with one other person
