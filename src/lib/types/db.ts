export type User = {
  id: string;
  username: string;
  email: string;
  provider:"credentials";
};

export type Document = {
  id: string;
  title: string;
  content: string;
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  location: string;
  schedule_name: string[];
  schedule_location: string[];
}

export type Message = {
  id: string;
  content: string;
  time: string;
}
