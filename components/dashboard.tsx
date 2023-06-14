"use client"

import { useEffect, useState } from "react"
import { EventsTypes, SingleEvent, events } from "@/lib/events"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"

export const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState<SingleEvent>({
    id: "null",
    event_type: "",
    dataArr: [],
  })
  const [currTabArr, setCurrTabArr] = useState<EventsTypes>([])
  const [isRemove, setIsRemove] = useState(false)

  useEffect(() => {
    let flag = false
    currTabArr.forEach((el: SingleEvent) => {
      if (el.id == currentTab.id) flag = true
    })

    if (!flag && !currTabArr.includes(currentTab))
      setCurrTabArr([...currTabArr, currentTab])
    console.log(currentTab)
    setIsRemove(false)
  }, [currentTab])

  const handleRemoveEvent = (el: SingleEvent) => {
    setIsRemove(true)
    setCurrTabArr(currTabArr.filter((item: SingleEvent) => item.id != el.id))
  }

  const handleIndex = () => {
    if (isRemove) {
      setCurrentTab(currTabArr.slice(-1)[0])
      setIsRemove(false)
    }
    return currTabArr.indexOf(currentTab) - 1
  }

  return (
    <div className="flex justify-start gap-2 m-1">
      {/* <EventsList /> */}
      <div className="h-[85vh] w-[13rem] rounded-md border p-4 flex-col content-between">
        <h4 className="mb-4 text-sm font-medium leading-none">EVENTS</h4>
        <ScrollArea className="h-[95%]">
          {events.map((event) => (
            <>
              <div
                className="text-sm cursor-pointer"
                key={event.id}
                onClick={() => setCurrentTab(event)}
              >
                {event.event_type}
              </div>
              <Separator className="my-2" />
            </>
          ))}
        </ScrollArea>
      </div>
      {/* <TabsArea /> */}
      {currTabArr.length == 1 ? (
        <div className="m-4">
          <h3>Choose an event</h3>
          <p>Your event and its details will be displayed here.</p>
        </div>
      ) : (
        <Tabs>
          <div className="border-b pb-1">
            <TabsList>
              {currTabArr.map((el) =>
                el.event_type == "" ? (
                  ""
                ) : (
                  <TabsTrigger
                    onClick={() => setCurrentTab(el)}
                    value={el.id}
                    key={el.id}
                    data-state={el.id == currentTab.id ? "active" : "inactive"}
                  >
                    {el.event_type}
                    {el.id == currentTab.id ? (
                      <Icons.cancel
                        onClick={() => handleRemoveEvent(el)}
                        className="w-[20px] pl-2"
                      />
                    ) : (
                      ""
                    )}
                  </TabsTrigger>
                )
              )}
            </TabsList>
          </div>
          {currTabArr.map((el) =>
            el.event_type == "" ? (
              ""
            ) : (
              <TabsContent
                key={el.id}
                value={el.id}
                data-state={el.id == currentTab.id ? "active" : "inactive"}
              >
                <ScrollArea className="h-[75vh]">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle>{el.event_type}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Lorem Ipsum</p>
                      </CardContent>
                    </Card>
                    {el.dataArr.map((item) => (
                      <Card key={item.title} className="w-full z-[10]">
                        <CardHeader>
                          <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{item.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            )
          )}
        </Tabs>
      )}
    </div>
  )
}
