import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi";

interface Props {
  isEdit?: boolean;
}

const AdminPage: React.FC<Props> = ({ isEdit = true }) => {
  const [content, setContent] = useState(
    isEdit ? { title: "", text: "" } : { id: "", title: "", text: "" }
  );
  const [currentPage, setCurrentPage] = useState<string>();
  const [pages, setPages] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosApi.get("pages.json");
      const pageKeys = Object.keys(response.data);
      setPages(pageKeys);
    };

    fetchData();
  }, []);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isEdit) {
      setContent((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    } else {
      const { name, value } = event.target;
      const pageId =
        name === "id"
          ? value
              .toLowerCase()
              .replace(/[^a-z0-9_-\s]/g, "")
              .replace(/\s+/g, "-")
          : value;
      setContent((prevPage) => ({
        ...prevPage,
        [name]: pageId,
      }));
    }
  };

  const formSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isEdit) {
      await axiosApi.put(`pages/${currentPage}.json`, content);
      navigate(`/pages/${currentPage}`);
    } else {
      const newPage = {
        title: content.title,
        text: content.text,
      };

      await axiosApi.put(`pages/${content.id}.json`, newPage);
      navigate("/");
    }
  };

  const getPageData = async () => {
    if (isEdit) {
      const response = await axiosApi.get(`pages/${currentPage}.json`);
      setContent(response.data);
    }
  };

  useEffect(() => {
    if (currentPage) {
      void getPageData();
    }
  }, [currentPage, isEdit]);

  let nameField = isEdit ? (
    <div className="mb-3">
      <select
        name="page"
        className="form-select"
        required
        onChange={(e) => setCurrentPage(e.target.value)}
      >
        {pages.map((page, index) => (
          <option key={index} value={page}>
            {page}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <div className="mb-3">
      <label htmlFor="id" className="form-label">
        New Page Name
      </label>
      <input
        name="id"
        value={content.id}
        onChange={onChange}
        type="text"
        className="form-control"
        id="id"
        required
      />
    </div>
  );

  return (
    <Form onSubmit={formSubmit}>
      <div className="mt-5">
        <h4>{isEdit ? "Edit page" : "Create new page"}</h4>
        <div>
          {nameField}
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
            {isEdit ? "Edit" : "Create"}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default AdminPage;
