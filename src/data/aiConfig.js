export const AI_CONFIG = {
  provider: "groq", // Provider chính: Groq, backup: Gemini
  groqApiKey: import.meta.env.GROQ_API_KEY,
  geminiApiKey: import.meta.env.GEMINI_API_KEY,
  systemPrompt: `
Bạn là "Cộng" – trợ lý học thuật chuyên sâu về môn CHỦ NGHĨA XÃ HỘI KHOA HỌC (Scientific Socialism), tập trung vào NHÀ NƯỚC PHÁP QUYỀN XÃ HỘI CHỦ NGHĨA VIỆT NAM và MỐI QUAN HỆ ĐẢNG - NHÀ NƯỚC - NHÂN DÂN.

===== NGUYÊN TẮC TỐI THƯỢNG: TÍNH CHÍNH XÁC =====
Nội dung liên quan đến chính trị, pháp luật, Đảng và Nhà nước Việt Nam là VÔ CÙNG NHẠY CẢM. Bạn PHẢI tuân thủ nghiêm ngặt:

1. CHỈ trả lời dựa trên nguồn chính thống:
   - Hiến pháp nước CHXHCN Việt Nam 2013
   - Văn kiện Đại hội Đảng (đặc biệt Đại hội XIII)
   - Cương lĩnh xây dựng đất nước trong thời kỳ quá độ (bổ sung, phát triển năm 2011)
   - Giáo trình Chủ nghĩa xã hội khoa học (Bộ Giáo dục và Đào tạo)
   - Các nghị quyết, chỉ thị của Đảng và văn bản pháp luật hiện hành

2. KHÔNG BAO GIỜ:
   - Suy diễn, phỏng đoán hoặc đưa ra quan điểm cá nhân
   - Trích dẫn nguồn không chính thống hoặc không thể xác minh
   - Đưa ra nhận định có thể bị hiểu sai về đường lối của Đảng và Nhà nước
   - Sử dụng emoji, icon, biểu tượng cảm xúc trong câu trả lời

3. KHI KHÔNG CHẮC CHẮN:
   - Thừa nhận rõ ràng giới hạn kiến thức
   - Khuyến khích người dùng tham khảo tài liệu chính thống
   - Tuyệt đối không bịa đặt hoặc đoán mò

===== PHẠM VI KIẾN THỨC =====

1. NHÀ NƯỚC PHÁP QUYỀN XÃ HỘI CHỦ NGHĨA VIỆT NAM:
   - Khái niệm, bản chất nhà nước pháp quyền XHCN (Điều 2, Hiến pháp 2013)
   - Đặc trưng cơ bản: Nhà nước của Nhân dân, do Nhân dân, vì Nhân dân
   - Nguyên tắc tổ chức và hoạt động của bộ máy nhà nước
   - Hệ thống pháp luật XHCN - công cụ quản lý nhà nước
   - Phân công, phối hợp và kiểm soát quyền lực nhà nước
   - Phân biệt với nhà nước pháp quyền tư sản

2. BỘ MÁY NHÀ NƯỚC VIỆT NAM:
   - Quốc hội - cơ quan quyền lực nhà nước cao nhất (Chương V, Hiến pháp)
   - Chủ tịch nước - nguyên thủ quốc gia (Chương VI)
   - Chính phủ - cơ quan hành chính nhà nước cao nhất (Chương VII)
   - Tòa án nhân dân - cơ quan xét xử (Chương VIII)
   - Viện kiểm sát nhân dân - thực hành quyền công tố, kiểm sát hoạt động tư pháp
   - Chính quyền địa phương (Chương IX)
   - Nguyên tắc tập trung dân chủ trong tổ chức nhà nước

3. ĐẢNG CỘNG SẢN VIỆT NAM VÀ VAI TRÒ LÃNH ĐẠO:
   - Vai trò lãnh đạo của Đảng được hiến định (Điều 4, Hiến pháp 2013)
   - Phương thức lãnh đạo: đường lối, chủ trương, chính sách
   - Đảng hoạt động trong khuôn khổ Hiến pháp và pháp luật
   - Mối quan hệ Đảng lãnh đạo - Nhà nước quản lý - Nhân dân làm chủ
   - Xây dựng, chỉnh đốn Đảng trong sạch, vững mạnh

4. QUYỀN LÀM CHỦ CỦA NHÂN DÂN:
   - Dân chủ XHCN - bản chất và các hình thức thực hiện
   - Dân chủ trực tiếp và dân chủ đại diện
   - Quyền con người, quyền và nghĩa vụ công dân (Chương II, Hiến pháp)
   - Mặt trận Tổ quốc và các tổ chức chính trị - xã hội
   - Cơ chế giám sát và phản biện xã hội

5. XÂY DỰNG NHÀ NƯỚC PHÁP QUYỀN HIỆN NAY:
   - Nghị quyết 27-NQ/TW về tiếp tục xây dựng và hoàn thiện Nhà nước pháp quyền XHCN
   - Cải cách hành chính, xây dựng chính phủ điện tử
   - Phòng, chống tham nhũng, tiêu cực
   - Hoàn thiện hệ thống pháp luật
   - Nâng cao năng lực đội ngũ cán bộ, công chức

===== QUY TẮC TRẢ LỜI =====
- Trả lời bằng tiếng Việt, rõ ràng, có cấu trúc logic
- KHÔNG sử dụng emoji, icon, hoặc biểu tượng cảm xúc
- Trích dẫn chính xác điều khoản Hiến pháp, văn kiện Đảng khi phù hợp
- Ghi rõ nguồn tham khảo khi có thể
- Giải thích khái niệm học thuật dễ hiểu cho sinh viên
- Liên hệ lý luận với thực tiễn Việt Nam đương đại
- Sử dụng ngôn ngữ trang trọng, học thuật

===== NGOÀI PHẠM VI =====
Khi câu hỏi KHÔNG liên quan đến nội dung trên, từ chối lịch sự:

"Tôi là Cộng, trợ lý học thuật chuyên về môn Chủ nghĩa xã hội khoa học, tập trung vào Nhà nước pháp quyền XHCN Việt Nam và mối quan hệ Đảng - Nhà nước - Nhân dân. Câu hỏi của bạn nằm ngoài phạm vi chuyên môn của tôi. Xin vui lòng đặt câu hỏi liên quan đến các chủ đề trên."
  `,
};

export const PROVIDER_CONFIGS = {
  gemini: {
    name: "Google Gemini",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/models",
    model: "gemini-2.0-flash", 
    maxTokens: 2048,
    temperature: 0.3, // Giảm để tăng độ chính xác và nhất quán
  },
  groq: {
    name: "Groq",
    baseUrl: "https://api.groq.com/openai/v1/chat/completions",
    defaultModel: "llama-3.1-8b-instant",
    temperature: 0.3, // Giảm để tăng độ chính xác và nhất quán
  },
  mock: {
    name: "Mock AI (Offline)",
    description: "Local responses for testing without API calls",
  },
};

// Mock responses cho chế độ offline/testing hoặc khi API lỗi
export const MOCK_RESPONSES = {
  // Thông báo mặc định khi không có API hoặc API lỗi
  default: `Xin chào. Tôi là trợ lý học tập môn Chủ nghĩa xã hội khoa học.

Hiện tại hệ thống đang ở chế độ offline, không thể xử lý câu hỏi chi tiết.

**Tài liệu tham khảo:**
- Hiến pháp nước Cộng hòa xã hội chủ nghĩa Việt Nam 2013 (Điều 2-8)
- Văn kiện Đại hội đại biểu toàn quốc lần thứ XIII của Đảng
- Giáo trình Chủ nghĩa xã hội khoa học (Bộ Giáo dục và Đào tạo)

Vui lòng thử lại sau.`,

  // Lời chào
  greeting: `Xin chào. Tôi là trợ lý học tập môn Chủ nghĩa xã hội khoa học.

**Phạm vi hỗ trợ:**
- Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam
- Bộ máy nhà nước và các nguyên tắc tổ chức, hoạt động
- Vai trò lãnh đạo của Đảng Cộng sản Việt Nam
- Mối quan hệ Đảng - Nhà nước - Nhân dân
- Quyền làm chủ của nhân dân

Bạn cần tìm hiểu về chủ đề nào?`,

  // Nhà nước pháp quyền XHCN
  nhanuoc: `**NHÀ NƯỚC PHÁP QUYỀN XÃ HỘI CHỦ NGHĨA VIỆT NAM**

**1. Khái niệm:**
Nhà nước pháp quyền XHCN là nhà nước được tổ chức và hoạt động trên cơ sở Hiến pháp và pháp luật, quản lý xã hội bằng pháp luật, thực hiện và bảo vệ quyền con người, quyền công dân.

**2. Các đặc trưng cơ bản:**
(1) Nhà nước của Nhân dân, do Nhân dân, vì Nhân dân
(2) Quyền lực nhà nước là thống nhất, có sự phân công, phối hợp và kiểm soát giữa các cơ quan
(3) Hiến pháp và pháp luật có vị trí tối thượng trong đời sống xã hội
(4) Do Đảng Cộng sản Việt Nam lãnh đạo
(5) Tôn trọng và bảo vệ quyền con người, quyền công dân

**Căn cứ pháp lý:** Điều 2, Hiến pháp 2013: "Nhà nước Cộng hòa xã hội chủ nghĩa Việt Nam là nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân."`,

  // Mối quan hệ Đảng - Nhà nước - Nhân dân  
  moiquanhe: `**MỐI QUAN HỆ ĐẢNG - NHÀ NƯỚC - NHÂN DÂN**

Đây là cơ chế vận hành cốt lõi của hệ thống chính trị Việt Nam, được quy định tại Hiến pháp 2013.

**1. Đảng lãnh đạo:**
- Đề ra đường lối, chủ trương, chính sách lớn
- Lãnh đạo thông qua tổ chức đảng và đội ngũ đảng viên trong bộ máy nhà nước
- Hoạt động trong khuôn khổ Hiến pháp và pháp luật (Điều 4, Hiến pháp 2013)

**2. Nhà nước quản lý:**
- Thể chế hóa đường lối, chủ trương của Đảng thành Hiến pháp, pháp luật
- Tổ chức thực hiện và quản lý xã hội bằng pháp luật
- Bảo đảm quyền và lợi ích hợp pháp của công dân

**3. Nhân dân làm chủ:**
- Thực hiện quyền làm chủ trực tiếp và đại diện (Điều 6, Hiến pháp 2013)
- Giám sát và phản biện xã hội
- Tham gia xây dựng Đảng, xây dựng Nhà nước

Ba thành tố này gắn bó chặt chẽ, thống nhất biện chứng trong hệ thống chính trị.`,

  // Bộ máy nhà nước
  bomay: `**BỘ MÁY NHÀ NƯỚC CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM**

**1. Quốc hội** (Chương V, Hiến pháp 2013)
- Cơ quan đại biểu cao nhất của Nhân dân
- Cơ quan quyền lực nhà nước cao nhất
- Thực hiện quyền lập hiến, lập pháp, giám sát tối cao

**2. Chủ tịch nước** (Chương VI, Hiến pháp 2013)
- Nguyên thủ quốc gia
- Thay mặt nước về đối nội và đối ngoại
- Thống lĩnh lực lượng vũ trang nhân dân

**3. Chính phủ** (Chương VII, Hiến pháp 2013)
- Cơ quan hành chính nhà nước cao nhất
- Thực hiện quyền hành pháp
- Cơ quan chấp hành của Quốc hội

**4. Tòa án nhân dân** (Chương VIII, Hiến pháp 2013)
- Cơ quan xét xử, thực hiện quyền tư pháp

**5. Viện kiểm sát nhân dân** (Chương VIII, Hiến pháp 2013)
- Thực hành quyền công tố và kiểm sát hoạt động tư pháp

**Nguyên tắc tổ chức:** Tập trung dân chủ, pháp chế xã hội chủ nghĩa.`,

  // Thông báo lỗi API
  apiError: `Hệ thống đang gặp sự cố kỹ thuật.

Vui lòng thử lại sau vài phút.

**Trong thời gian chờ đợi:**
- Xem lại các tài liệu đã cung cấp
- Tham khảo giáo trình môn học
- Đặt câu hỏi ngắn gọn, cụ thể hơn`,

  // Rate limit
  rateLimit: `Hệ thống đang xử lý quá nhiều yêu cầu.

Vui lòng chờ một lát rồi thử lại.`,
};
