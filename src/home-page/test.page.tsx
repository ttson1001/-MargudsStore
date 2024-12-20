import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Image, Space, Button } from "antd";
import axios from "axios";
import { API_SERVER } from "../api/admin-api";
import logo from "../access/images/LogoEXE-01.png";

const BlogFeed = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API_SERVER + "api/Blog/GetAllBlogs");
        if (response.data) {
          setBlogs(response.data.data); // Accessing the 'data' array
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Blog Feed</h1>
      <div className="flex flex-col gap-4">
        {blogs.map((blog: any) => (
          <Card key={blog.blogID} className="shadow-md rounded-md">
            <Space align="start">
              <Avatar src={logo} size="large" />
              <div>
                <Typography.Text strong>{blog.author}</Typography.Text>
                <Typography.Text className="text-gray-500 block">
                  {new Date(blog.createAt).toLocaleString()}
                </Typography.Text>
              </div>
            </Space>
            <Typography.Title level={4} className="mt-4">
              {blog.title}
            </Typography.Title>
            <Typography.Paragraph>{blog.content}</Typography.Paragraph>
            {blog.imageBlogs.length > 0 && (
              <div className="flex gap-2 mt-4">
                {blog.imageBlogs.map((img: any, index: any) => (
                  <Image key={index} src={img.image} alt="Blog" width={120} />
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogFeed;
