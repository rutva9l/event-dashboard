export type EventsTypes = typeof events

export type SingleEvent =  {
    id: string,
    event_type: string,
    dataArr: { title: string; content: string; }[]
}

const data = Array.from({length: 10}).map(
    (_, i, n) => ({title: `Lorem Ipsum ${i+1}`, content: "Lorem Ipsum"})
)


export const events = Array.from({length: 20}).map(
    (_, i, n) => 
    ({
        id: `${i}`, 
        event_type: `Event Type ${i+1}`, 
        dataArr: data
    })
)