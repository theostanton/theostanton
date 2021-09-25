export type Row = {
  id: number
}

export type Dirty<Type extends Row> = Omit<Type, "id">

export type User = {
  id: string
}

export type Session = Row & {
  user: string
}

export type DirtySession = Dirty<Session>

export type Click = Row & {
  session: number
  target: string
  timestamp: Date
}

export type DirtyClick = Dirty<Click>

export type View = Row & {
  session: number
  page: string
  timestamp: Date
}

export type DirtyView = Dirty<View>


