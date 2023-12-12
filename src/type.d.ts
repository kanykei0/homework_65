export interface Page {
  title: string;
  text: string;
}

export interface PageCreate {
  id: string;
  title: string;
  text: string;
}

export interface NewPage {
  [id: string]: {
    title: string;
    text: string;
  };
}
