import * as React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import { useParams } from 'react-router-dom'
import { useEventsContext } from '../../contexts/eventContext'
import './Chart.css'

export function Chart() {
  const { id } = useParams<{ id: string }>()
  const { events } = useEventsContext()
  const [seriesData, setSeriesData] = React.useState<
    { id: number; value: number; label: string }[]
  >([])

  React.useEffect(() => {
    if (events && events.length > 0) {
      // Aggregate data based on event types
      const eventTypesMap: { [key: string]: number } = {}
      events.forEach((event) => {
        const type = event.getType() // Assuming you have a method to get event type
        if (eventTypesMap[type]) {
          eventTypesMap[type] += 1
        } else {
          eventTypesMap[type] = 1
        }
      })

      // Convert aggregated data to format suitable for PieChart
      const formattedData = Object.keys(eventTypesMap).map((type, index) => ({
        id: index,
        value: eventTypesMap[type],
        label: type,
      }))

      setSeriesData(formattedData)
    }
  }, [events])

  return (
    <div className='chart-container'>
      <h2>Event Type Proportions</h2>
      <PieChart
        className='chart'
        series={[{ data: seriesData }]}
        width={650}
        height={200}
      />
    </div>
  )
}
