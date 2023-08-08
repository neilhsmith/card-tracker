import clsx from "clsx"
import { ComponentPropsWithoutRef } from "react"
import {
  BsSuitClubFill,
  BsSuitDiamondFill,
  BsSuitHeartFill,
  BsSuitSpadeFill,
} from "react-icons/bs"
import useUndoable from "use-undoable"

const VALUES = [
  "A",
  "K",
  "Q",
  "J",
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
]
const SUITS = [
  {
    suit: "diamond",
    color: "text-red-500",
    icon: <BsSuitDiamondFill />,
  },
  {
    suit: "club",
    color: "text-slate-50",
    icon: <BsSuitClubFill />,
  },
  {
    suit: "heart",
    color: "text-red-500",
    icon: <BsSuitHeartFill />,
  },
  {
    suit: "spade",
    color: "text-slate-50",
    icon: <BsSuitSpadeFill />,
  },
]

type Card = {
  suit: string
  value: string
}

function App() {
  const [deactivated, setDeactivated, { undo, redo }] = useUndoable<
    Array<Card>
  >([])

  const deactivateCard = (suit: string, value: string) => {
    setDeactivated([
      ...deactivated,
      {
        suit,
        value,
      },
    ])
  }

  const reset = () => {
    setDeactivated([])
  }

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center text-4xl bg-slate-800">
        <div className="flex lg:flex-col gap-2">
          {SUITS.map((row) => (
            <div
              key={row.suit}
              className={clsx(
                row.color,
                "flex flex-col lg:flex-row items-center"
              )}
            >
              <div className="mb-6 lg:mb-0 lg:mr-6">{row.icon}</div>
              {VALUES.map((value) => (
                <Button
                  key={value}
                  disabled={deactivated.some(
                    (d) => d.suit === row.suit && d.value === value
                  )}
                  onClick={() => deactivateCard(row.suit, value)}
                >
                  {value}
                </Button>
              ))}
            </div>
          ))}
          <div className="mt-6 flex justify-end items-center px-4 text-lg text-slate-50">
            <button
              disabled={deactivated.length === 0}
              onClick={reset}
              className="cursor-pointer disabled:text-gray-600 disabled:cursor-not-allowed"
            >
              Reset
            </button>
            <span className="mx-8">/</span>
            <div className="flex gap-2">
              <button
                onClick={undo}
                className="cursor-pointer disabled:text-gray-600 disabled:cursor-not-allowed"
              >
                Undo
              </button>
              <button
                onClick={redo}
                className="cursor-pointer disabled:text-gray-600 disabled:cursor-not-allowed"
              >
                Redo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

function Button({
  children,
  disabled,
  ...rest
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      disabled={disabled}
      className="w-14 py-2 grow shrink basis-0 text-center font-semibold rounded hover:bg-slate-700 disabled:text-gray-600 disabled:cursor-not-allowed"
      {...rest}
    >
      {children}
    </button>
  )
}
