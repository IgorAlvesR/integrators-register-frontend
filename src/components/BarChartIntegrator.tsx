'use client'

import config from '@/../tailwind.config'
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return
  error(...args)
}

type BarLabel = {
  text: string
  value: number
}

type BarChartIntegratorProps = {
  title: string
  data: Array<BarLabel>
}

export function BarChartIntegrator({
  data = [],
  title,
}: BarChartIntegratorProps) {
  const colorsDefault = config.theme.extend.colors

  return (
    <>
      <main className="flex text-xs md:text-lg md:text-md h-[500px] border rounded flex-col">
        <h1 className="p-6 text-2xl font-semibold">{title}</h1>
        {!!data.length && (
          <ResponsiveContainer width="100%" height="80%" className="mt-10">
            <BarChart data={data}>
              <XAxis id="test" dataKey="text" />
              <YAxis id="test" />
              <Bar
                stroke={colorsDefault.primary.foreground}
                maxBarSize={80}
                dataKey="value"
                fill={colorsDefault.primary.DEFAULT}
              >
                <LabelList
                  dataKey="value"
                  fill={colorsDefault.accent.DEFAULT}
                  position="center"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </main>
    </>
  )
}
