import { assign, createMachine } from "xstate";

interface TimerContext {
  currentTick: number;
  totalTicks: number;
  tickDuration: number;
  playing: boolean;
  sequences: boolean[][];
  activated: number[][];
}

type activateTick = {
  row: number;
  index: number;
};

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
    initial: "running",
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
          },
        },
        on: {
         '': {
            target: "paused",
            cond: context => {
              return !context.playing;
            },
          },
          TICK: {
            actions: assign({
              currentTick: context => (context.currentTick + 1 > context.totalTicks ? 1 : context.currentTick + 1),
            }),
          },
          STOP: {
            target: "paused",
            actions: [() => console.log("pause"), assign({ playing: false })],
          },
        },
      },
      paused: {
        on: {
          PLAY: {
            target: "running",
            actions: [() => console.log("play"), assign({ playing: true })],
          },
        },
      },
    },
    on: {
      RESET: {
        actions: assign({
          currentTick: 0,
        }),
      },
      ACTIVATE: {
        actions: [assign({
        sequences: (context, event) => {
          const { row, index } = event.value;
          const { sequences } = context;
          const updatedSequences = sequences?.map((seq, idx) => (idx === row ? seq.map((value, i) => (i === index ? !value : value)) : seq)) 
          console.log("event triggered", event.value, sequences.length, updatedSequences);
          return sequences.length > 0 ? updatedSequences : [];
        }
      }),
        assign({
            activated: (context, event) => {
                const { row, index } = event.value;
                const act = context.activated
            }
        })]
      },
    },
  });
