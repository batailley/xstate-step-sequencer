import { assign, createMachine } from "xstate";

interface TimerContext {
  currentTick: number;
  totalTicks: number;
  tickDuration: number;
  playing: boolean;
  sequences: Array<Array<boolean>>;
}

type activateTick = {
  row: number;
  index: number;
}

type TimerEvent =
  | {
    type: "TICK";
  }
  | {
    type: "ACTIVATE";
    value: activateTick;
  }
  | {
    type: "RESET";
  }
  | {
    type: "PLAY";
  }
  | {
    type: "STOP";
  };    
export const tickerMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYgCUBRAZQoBUBtABgF1FQAHAe1lwBddO+NiAAeiAIwBOAEwA6RgHYAHOOmSAbABZJkgKwBmZQBoQATwnSAvpZNoseQkVkAnAK758BKCSaskILh5+QWExBGlpcVlNJWVNfWl9dQVdJX0TcwRNCNkDSQV1SUZIhX1dXU1rWwwcAmIXd098b1oASQBhAGlfYUC+ASF-MKVGWQVxdSTNTXVEzUZDDMRpBUkx3XFGdXE0lU0KqpA7WsdZdnRXWEgfFl7ufpCh5cjo2KV4xOTU9LNEQ3VcuV5ox5lJNKprDYQPhOBA4MJjg5iHcggNQohNEsEFI5NJdDoFIwQREZEpDoi6k43B4vCiHoNQGFdNIsfoVLI2Zt9lJ8bpVuSakinOdLpA6cEGaI-oZcniJu8FCkFDNdFjwbpZNIFmz9uo9Up1LpIZYgA */
  createMachine<TimerContext, TimerEvent>({
    predictableActionArguments: true,
    initial: "stopped",
    context: {
      currentTick: 0,
      totalTicks: 24,
      tickDuration: 700,
      playing: true,
      sequences: Array(3).fill(Array(24).fill(false)),
    },
    states: {
      running: {
        invoke: {
          src: context => cb => {
            const interval = setInterval(() => {
              cb("TICK");
            }, context.tickDuration);
            return () => {
              clearInterval(interval);
            };
          }
        },
        on: {
          TICK: {
            target:'running',
            actions: assign({
              currentTick: (context) =>
                (context.currentTick + 1) > context.totalTicks ? 1 : (context.currentTick + 1)
            })
          },
          STOP: {
            target: 'paused',
            actions: [
              () => console.log('pause'),
              assign({ playing: false })]
          },

        ACTIVATE: {
          actions: assign({
            sequences: (context, event) => {
              console.log('event triggered', event.value);
              const { row, index } = event.value;
              const { sequences } = context;
              const newSeq = sequences.map((s, idx) =>
                idx === row ?
                  s.map((v, i) => i === index ? !v : v) :
                  s)
              console.log('new', newSeq)
              return newSeq;
            }
          })
        }          
        }
      },
      paused: {
        on: {
          PLAY: {
            target: 'running',
            actions: [
              () => console.log('play'),
              assign({ playing: true })]
          }
        }
      }
    },
    on: {
        RESET: {
          actions: assign({
            currentTick: 0
          })
        },
      }
  });
