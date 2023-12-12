import { useEffect, useState } from "react";
import { Page } from "../../type";
import axiosApi from "../../axiosApi";
import Content from "../../components/Content/Content";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Page = () => {
  const [content, setContent] = useState<Page | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchPage = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get(`pages/${id}.json`);
      setContent(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPage();
  }, [id]);

  let pageContent = content && (
    <Content title={content.title} text={content.text} />
  );

  if (loading) {
    pageContent = <Spinner />;
  }

  return (
    <>
      <div>{pageContent}</div>
    </>
  );
};

export default Page;
