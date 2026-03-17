import { useState } from 'react'
import { ChevronLeft, ChevronRight, Target, FileText } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameMonth, isToday, isSameDay, addMonths, subMonths } from 'date-fns'
import { cn } from '../../utils/cn'

const mockEvents = [
  { date: new Date(), title: 'Goal Deadline: REST API', type: 'goal' as const },
  { date: new Date(Date.now() + 3 * 86400000), title: 'Report Due: Week 6', type: 'report' as const },
  { date: new Date(Date.now() + 7 * 86400000), title: 'Goal Deadline: UI Design', type: 'goal' as const },
  { date: new Date(Date.now() + 10 * 86400000), title: 'Report Due: Week 7', type: 'report' as const },
]

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const days = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) })
  const startPad = getDay(startOfMonth(currentDate))
  const selectedEvents = selectedDate ? mockEvents.filter(e => isSameDay(e.date, selectedDate)) : []

  return (
    <div className="page-container space-y-6">
      <h2 className="text-2xl font-bold text-secondary dark:text-white">Calendar</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-border dark:border-gray-700 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="w-8 h-8 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors">
              <ChevronLeft size={16} className="text-muted" />
            </button>
            <h3 className="text-base font-bold text-secondary dark:text-white">{format(currentDate, 'MMMM yyyy')}</h3>
            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="w-8 h-8 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors">
              <ChevronRight size={16} className="text-muted" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-center text-xs font-semibold text-muted py-2">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array(startPad).fill(null).map((_, i) => <div key={`pad-${i}`} />)}
            {days.map(day => {
              const hasEvent = mockEvents.some(e => isSameDay(e.date, day))
              const isSelected = selectedDate && isSameDay(day, selectedDate)
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    'relative h-10 rounded-xl text-sm transition-all duration-150 font-medium',
                    isToday(day) && !isSelected && 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
                    isSelected && 'bg-primary-500 text-white shadow-glow',
                    !isToday(day) && !isSelected && 'text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                >
                  {format(day, 'd')}
                  {hasEvent && (
                    <span className={cn('absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full', isSelected ? 'bg-white' : 'bg-primary-500')} />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Events for selected day */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-border dark:border-gray-700 p-6">
          <h3 className="text-sm font-bold text-secondary dark:text-white mb-1">
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
          </h3>
          <p className="text-xs text-muted mb-4">{selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''}</p>
          <div className="space-y-3">
            {selectedEvents.length === 0 ? (
              <div className="text-center py-8 text-muted">
                <div className="text-4xl mb-2">📅</div>
                <p className="text-sm">No events today</p>
              </div>
            ) : selectedEvents.map((ev, i) => (
              <div key={i} className={cn('p-3 rounded-xl border flex items-start gap-3', ev.type === 'goal' ? 'border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20' : 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20')}>
                {ev.type === 'goal' ? <Target size={15} className="text-primary-500 mt-0.5 shrink-0" /> : <FileText size={15} className="text-success mt-0.5 shrink-0" />}
                <div>
                  <p className="text-xs font-semibold text-secondary dark:text-white">{ev.title}</p>
                  <p className="text-xs text-muted mt-0.5 capitalize">{ev.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
