// src/components/AboutContent.tsx
import React from "react";
import { Typography, Row, Col, Avatar, Divider, Card } from "antd";

const { Title, Paragraph } = Typography;

const AboutContent: React.FC = () => {
  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={2} style={{ textAlign: "center", color: "#007bff" }}>
        Chào Mừng Đến Với Công Ty Chúng Tôi
      </Title>
      <Paragraph style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
        Chúng tôi là một công ty chuyên cung cấp giải pháp công nghệ thông tin,
        với sứ mệnh mang lại giá trị tối ưu cho khách hàng và cộng đồng. Chúng
        tôi không ngừng phát triển và đổi mới để đáp ứng nhu cầu ngày càng cao
        của thị trường. Đội ngũ của chúng tôi luôn làm việc hết mình để tìm ra
        những giải pháp sáng tạo và hiệu quả nhất cho khách hàng.
      </Paragraph>
      <Paragraph style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
        Với nhiều năm kinh nghiệm trong ngành công nghiệp, chúng tôi đã xây dựng
        được mối quan hệ tốt với các đối tác và khách hàng. Chúng tôi cam kết
        cung cấp dịch vụ chuyên nghiệp và tận tâm, đảm bảo mỗi sản phẩm đến tay
        khách hàng đều đạt tiêu chuẩn cao nhất.
      </Paragraph>
      <Paragraph style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
        Mỗi ngày, chúng tôi nỗ lực để đổi mới công nghệ, phát triển các giải
        pháp phù hợp với xu hướng và nhu cầu của thị trường, đồng thời tăng
        cường khả năng phục vụ khách hàng với những sản phẩm và dịch vụ tốt
        nhất.
      </Paragraph>

      <Divider />

      <Title level={3} style={{ color: "#007bff" }}>
        Sứ Mệnh Của Chúng Tôi
      </Title>
      <Paragraph style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
        Đem đến những sản phẩm và dịch vụ chất lượng cao, phục vụ nhu cầu của
        khách hàng một cách nhanh chóng và hiệu quả nhất. Chúng tôi không ngừng
        nỗ lực để cải tiến và nâng cao chất lượng dịch vụ của mình, nhằm đem lại
        sự hài lòng tối đa cho khách hàng.
      </Paragraph>
      <Paragraph style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
        Chúng tôi tin rằng công nghệ là một công cụ mạnh mẽ có thể giúp thay đổi
        cuộc sống. Do đó, sứ mệnh của chúng tôi còn là tạo ra những sản phẩm đổi
        mới, mang lại giá trị bền vững cho cộng đồng và môi trường.
      </Paragraph>
      <Paragraph style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
        Bằng cách phát triển các giải pháp xanh và bền vững, chúng tôi hy vọng
        sẽ góp phần vào việc bảo vệ môi trường và xây dựng một xã hội tốt đẹp
        hơn.
      </Paragraph>

      <Divider />

      <Title level={3} style={{ color: "#007bff" }}>
        Đội Ngũ Của Chúng Tôi
      </Title>
      <Row gutter={16} justify="center">
        <Col span={6}>
          <Card
            style={{
              textAlign: "center",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
            }}
          >
            <Avatar
              size={100}
              src="https://via.placeholder.com/100?text=Người+1"
              style={{ marginBottom: "10px" }}
            />
            <Title level={4}>Nguyễn Văn A</Title>
            <Paragraph>CEO</Paragraph>
            <Paragraph style={{ fontSize: "0.9em", color: "#555" }}>
              Với hơn 10 năm kinh nghiệm trong lĩnh vực công nghệ thông tin, ông
              A đã dẫn dắt công ty đi đến thành công, xây dựng đội ngũ mạnh mẽ
              và tạo dựng thương hiệu vững chắc trên thị trường.
            </Paragraph>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{
              textAlign: "center",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
            }}
          >
            <Avatar
              size={100}
              src="https://via.placeholder.com/100?text=Người+2"
              style={{ marginBottom: "10px" }}
            />
            <Title level={4}>Trần Thị B</Title>
            <Paragraph>CTO</Paragraph>
            <Paragraph style={{ fontSize: "0.9em", color: "#555" }}>
              B với sự đam mê công nghệ và tư duy sáng tạo đã giúp công ty phát
              triển các sản phẩm đột phá, cải tiến quy trình phát triển và tối
              ưu hóa hiệu suất làm việc.
            </Paragraph>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{
              textAlign: "center",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
            }}
          >
            <Avatar
              size={100}
              src="https://via.placeholder.com/100?text=Người+3"
              style={{ marginBottom: "10px" }}
            />
            <Title level={4}>Lê Văn C</Title>
            <Paragraph>CFO</Paragraph>
            <Paragraph style={{ fontSize: "0.9em", color: "#555" }}>
              C có khả năng quản lý tài chính tốt, giúp công ty tối ưu hóa chi
              phí và đạt được lợi nhuận cao, đồng thời lập kế hoạch chiến lược
              cho sự phát triển bền vững của công ty.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Title level={3} style={{ color: "#007bff" }}>
        Các Lĩnh Vực Hoạt Động
      </Title>
      <Paragraph style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
        Chúng tôi hoạt động trong nhiều lĩnh vực khác nhau, bao gồm:
      </Paragraph>
      <ul style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
        <li>Cung cấp giải pháp phần mềm tùy chỉnh</li>
        <li>Phát triển ứng dụng di động</li>
        <li>Phát triển hệ thống quản lý doanh nghiệp</li>
        <li>Thiết kế website và thương mại điện tử</li>
        <li>Dịch vụ tư vấn công nghệ thông tin</li>
        <li>Giải pháp an ninh mạng và bảo mật dữ liệu</li>
      </ul>

      <Divider />

      <Title level={3} style={{ color: "#007bff" }}>
        Liên Hệ Chúng Tôi
      </Title>
      <Paragraph style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
        Nếu bạn có bất kỳ câu hỏi nào về sản phẩm hoặc dịch vụ của chúng tôi,
        vui lòng liên hệ với chúng tôi qua email hoặc điện thoại. Chúng tôi rất
        mong nhận được phản hồi từ bạn.
      </Paragraph>
      <Paragraph style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
        Email: contact@company.com | Điện thoại: (012) 345-6789
      </Paragraph>
    </div>
  );
};

export default AboutContent;
