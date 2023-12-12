import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { Page } from "../../type";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi";

const AdminPage = () => {
  const [content, setContent] = useState<Page>({
    title: "",
    text: "",
  });

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>();
  const navigate = useNavigate();

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContent((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const formSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axiosApi.put(`pages/${currentPage}.json`, content);
      navigate(`/pages/${currentPage}`);
    } finally {
      setLoading(false);
    }
  };

  const getPageData = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get(`pages/${currentPage}.json`);
      setContent(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage) {
      void getPageData();
    }
  }, [currentPage]);

  return (
    <Form onSubmit={formSubmit}>
      <div className="mt-5">
        <h4>Edit pages</h4>
        <div>
          <div className="mb-3">
            <select
              name="page"
              className="form-select"
              required
              onChange={(e) => setCurrentPage(e.target.value)}
            >
              <option value="">Select page</option>
              <option value="home">Home</option>
              <option value="about">About</option>
              <option value="contacts">Contacts</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              name="title"
              value={content.title}
              onChange={onChange}
              type="text"
              className="form-control"
              id="title"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="textarea" className="form-label">
              Content
            </label>
            <textarea
              name="text"
              value={content.text}
              onChange={onChange}
              rows={5}
              className="form-control"
              id="textarea"
              required
            />
          </div>
          <Button variant="success" type="submit">
            Edit
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default AdminPage;
