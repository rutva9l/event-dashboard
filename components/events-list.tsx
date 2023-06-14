import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { events } from "@/lib/events"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export function eventsList() {
  return (
    <ScrollArea className="h-[85vh] w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">EVENTS</h4>
        {events.map((event) => (
          <React.Fragment>
            <div className="text-sm" key={event.id}>
              {event.event_type}
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
