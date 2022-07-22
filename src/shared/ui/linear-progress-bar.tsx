export interface LinearProgressBarProps {
  progress?: number
}

export const LinearProgressBar: React.FunctionComponent<LinearProgressBarProps> =
  ({ progress }) => {
    return (
      <div className="w-full">
        <div className="h-2 w-full bg-gray-200 overflow-hidden">
          <div
            style={{ transformOrigin: '0% 50%' }}
            className="w-full h-full bg-blue-400 animate-infinite-linear"
          />
        </div>
      </div>
    )
  }
