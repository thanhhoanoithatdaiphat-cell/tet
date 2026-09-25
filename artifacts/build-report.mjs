import { createRequire } from "module";
import fs from "fs";
const require = createRequire(import.meta.url);
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, LevelFormat, PageNumber, VerticalAlign,
} = require("/tmp/docx-gen/node_modules/docx");

const RED = "8F2D2D";
const CREAM = "F4EDE2";
const INK = "2A221C";
const MUTED = "6F6458";
const LINE = "E4D5C4";
const WHITE = "FFFFFF";

const pageBorder = {
  style: BorderStyle.SINGLE,
  size: 4,
  color: LINE,
};

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 160, before: opts.before ?? 0, line: 276 },
    alignment: opts.align,
    children: [
      new TextRun({
        text,
        font: "Arial",
        size: opts.size ?? 22,
        bold: opts.bold,
        italics: opts.italics,
        color: opts.color ?? INK,
      }),
    ],
  });
}

function h(level, text) {
  const sizes = { 1: 32, 2: 26, 3: 24 };
  return new Paragraph({
    heading: level === 1 ? HeadingLevel.HEADING_1 : level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3,
    spacing: { before: level === 1 ? 360 : 280, after: 140 },
    children: [
      new TextRun({
        text,
        font: "Arial",
        size: sizes[level],
        bold: true,
        color: level === 1 ? RED : INK,
      }),
    ],
  });
}

function bullet(text, ref = "bullets") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80, line: 260 },
    children: [new TextRun({ text, font: "Arial", size: 21, color: INK })],
  });
}

function cell(text, opts = {}) {
  return new TableCell({
    width: { size: opts.w ?? 2340, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: opts.fill ?? WHITE },
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            font: "Arial",
            size: opts.size ?? 19,
            bold: opts.bold,
            color: opts.color ?? INK,
          }),
        ],
      }),
    ],
  });
}

function table(headers, rows, colWidths) {
  const headerRow = new TableRow({
    children: headers.map((h, i) =>
      cell(h, { w: colWidths[i], fill: RED, color: WHITE, bold: true })
    ),
  });
  const dataRows = rows.map((r, ri) =>
    new TableRow({
      children: r.map((c, i) =>
        cell(String(c), { w: colWidths[i], fill: ri % 2 ? CREAM : WHITE })
      ),
    })
  );
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows],
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: RED },
        paragraph: { spacing: { before: 360, after: 140 }, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: INK },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 },
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: INK },
        paragraph: { spacing: { before: 220, after: 100 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
      {
        reference: "bullets2",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
      {
        reference: "steps",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 },
      },
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "NHÀ CÓ TẾT  ·  Báo cáo thiết kế hệ thống AI", font: "Arial", size: 16, color: MUTED }),
            ],
          }),
        ],
      }),
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: "Trang ", font: "Arial", size: 16, color: MUTED }),
              new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: MUTED }),
            ],
          }),
        ],
      }),
    },
    children: [
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: "BÁO CÁO NỘI BỘ", font: "Arial", size: 18, bold: true, color: RED })],
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: "Hệ thống AI tự động tư vấn, chốt đơn và đăng bài", font: "Arial", size: 36, bold: true, color: INK })],
      }),
      p("Shop: Nhà Có Tết  ·  Kênh: TikTok + Facebook  ·  Mô hình: set Tết hiện đại tầm trung", { size: 20, color: MUTED, after: 60 }),
      p("Ngày: 21/09/2026  ·  Mục tiêu mùa: Tết Đinh Mùi (06/02/2027)  ·  Mốc giao: 23 tháng Chạp (30/01/2027)", { size: 20, color: MUTED, after: 280 }),

      h(1, "1. Kết luận ngắn"),
      p("Không xây “một con bot nói hay”. Xây một hệ điều hành bán hàng: khách nhắn ở đâu cũng vào cùng một bộ não, bộ não đọc đúng catalog + tồn + mốc giao Tết, rồi mới được phép chốt đơn hoặc đăng bài."),
      p("Nguyên tắc cứng: AI được quyền tư vấn và thu lead 24/7. AI chỉ được tự chốt đơn khi đủ 5 điều kiện (set rõ, SĐT, địa chỉ có tỉnh, còn hàng, còn nằm trong mốc giao). Mọi thứ còn lại chuyển người. Đăng bài thì AI soạn và xếp lịch; người duyệt 30 giây trước khi lên sóng trong 30 ngày đầu."),
      p("Làm đúng thứ tự: dữ liệu trước, inbox sau, đăng bài sau cùng. Đảo thứ tự thì bot sẽ bán sai size, hứa giao trễ Tết, và đăng clip không khớp hàng."),

      h(1, "2. Bức tranh hệ thống"),
      p("Ba vòng độc lập, dùng chung một nguồn sự thật (catalog + tồn + chính sách + khách)."),
      table(
        ["Vòng", "Việc AI làm", "Người vẫn giữ"],
        [
          ["Tư vấn", "Trả lời size, chất liệu, set nào cho nhà nào, giá, deadline", "Khiếu nại, đổi set, nhà méo/không chuẩn"],
          ["Chốt đơn", "Thu đủ field, tạo đơn COD, gửi xác nhận", "Đơn tỉnh sát mốc, hết hàng, giá thương lượng"],
          ["Đăng bài", "Soạn caption + lịch + biến thể 3 set", "Duyệt trước khi đăng, livestream, KOL"],
        ],
        [1800, 3780, 3780]
      ),
      new Paragraph({ spacing: { after: 200 }, children: [] }),
      p("Luồng dữ liệu một chiều: Kênh (TikTok / Facebook / Zalo / landing) → Tầng tiếp nhận (webhook) → Bộ não AI (RAG + công cụ) → Hành động (trả lời / tạo đơn / xếp lịch bài) → Kho sự thật (đơn, tồn, hội thoại) → Báo cáo mỗi sáng."),

      h(1, "3. Tầng 0 — Kho sự thật (làm trước khi bật bot)"),
      p("Bot dốt vì dữ liệu rời. Tối thiểu 6 bảng:"),
      table(
        ["Bảng", "Trường bắt buộc", "Vì sao"],
        [
          ["Sản phẩm", "id, tên, giá, gồm món, mét tường, ảnh, clip, tồn", "Tránh bán set không còn"],
          ["Chính sách", "mốc 23 Chạp / 28 Tết, COD, đổi 48h, không khoan", "Bot không bịa deadline"],
          ["Khách", "SĐT, kênh gốc, ảnh phòng, set gợi ý", "Không hỏi lại lần 2"],
          ["Đơn", "mã, set, COD, địa chỉ, ngày giao hứa", "Đối soát ship"],
          ["Hội thoại", "tin nhắn thô + intent + đã chốt chưa", "Huấn luyện lại tuần"],
          ["Nội dung", "hook, caption, CTA, set gắn ads", "Đăng bài khớp hàng"],
        ],
        [1800, 3780, 3780]
      ),
      new Paragraph({ spacing: { after: 160 }, children: [] }),
      p("Catalog hiện tại giữ đúng 3 SKU: Set Cửa 399.000đ, Set Phòng khách 699.000đ (hero), Set Cả nhà 999.000đ. Bot không được tự nghĩ ra SKU thứ tư."),
      p("Mỗi set gắn sẵn: nhà nào hợp, clip nào, câu phản đối nào (mai giả, sợ trễ, nhà thuê). Đây là “thẻ bán hàng”, không phải mô tả marketing."),

      h(1, "4. Tầng 1 — Tư vấn tự động"),
      h(2, "4.1 Kênh vào"),
      bullet("Zalo OA (Growth trở lên mới có API chatbot, khoảng 2,5 triệu đồng/năm). Đây là kênh chốt chính của khách Việt."),
      bullet("Facebook / Instagram Messenger — Meta đã có trợ lý bán hàng tại Việt Nam; vẫn nên nối webhook riêng nếu muốn kiểm soát catalog."),
      bullet("TikTok inbox + comment dưới video. Comment “giá / còn hàng / ship tỉnh” phải trả trong vài phút vì thuật toán đẩy video đang chạy."),
      bullet("Landing Nhà Có Tết: nút Zalo đã có sẵn tin nhắn mẫu + form COD. Bot đọc đơn từ form này như một kênh."),

      h(2, "4.2 Bộ não tư vấn"),
      p("Không để model tự do. Mỗi tin nhắn đi qua 4 bước:"),
      table(
        ["Bước", "Làm gì", "Đầu ra"],
        [
          ["1. Phân loại", "intent: giá / size / giao / đổi / chốt / spam", "nhãn + độ tin"],
          ["2. Lấy dữ liệu", "đọc đúng 1 set + tồn + mốc giao hôm nay", "context cứng"],
          ["3. Soạn trả lời", "giọng shop: cụ thể, có số, không sến", "1–2 tin ngắn"],
          ["4. Cổng an toàn", "nếu thiếu data hoặc độ tin < 0.7 → người", "gắn tag vàng"],
        ],
        [1800, 3780, 3780]
      ),
      new Paragraph({ spacing: { after: 160 }, children: [] }),
      p("Câu trả lời chuẩn luôn có 3 mảnh: chẩn đoán nhà → set đề xuất + giá → câu hỏi chốt (gửi ảnh tường / SĐT / tỉnh). Thiếu một mảnh là bot đang tán gẫu, không bán."),

      h(2, "4.3 Kịch bản xương sống"),
      p("Bot chỉ cần thuộc 8 tình huống. Ngoài 8 tình huống thì chuyển người."),
      table(
        ["Tình huống", "Bot nói gì", "Hành động tiếp"],
        [
          ["Hỏi giá", "3 mốc 399 / 699 / 999 + set nào bán chạy", "Hỏi loại nhà"],
          ["Chung cư nhỏ", "399 hoặc 699, tường 2–3m", "Xin ảnh phòng"],
          ["Nhà phố", "699 hoặc 999 vì có cửa", "Xin ảnh cửa + khách"],
          ["Mai giả?", "Cận ban ngày + dáng gọn, không hội chợ", "Gửi 1 ảnh cận"],
          ["Nhà thuê / sợ khoan", "Móc dán có trong hộp, cây đặt sàn", "Hỏi có dán được tường không"],
          ["Tỉnh / sợ trễ", "Chốt trước 30/01 thì kịp; sau đó nói thẳng", "Hỏi tỉnh + ngày muốn nhận"],
          ["Xin giảm giá", "Không mặc cả set; có thể tặng phụ kiện nhỏ", "Giữ giá, đẩy chốt"],
          ["Gửi ảnh phòng", "Đo ước lượng + chọn 1 set", "Mời COD hoặc Zalo xác nhận"],
        ],
        [2200, 3800, 3360]
      ),

      h(1, "5. Tầng 2 — Chốt đơn tự động"),
      p("Chốt đơn là chỗ dễ mất tiền và mất uy tín Tết nhất. Đặt cổng 5 điều kiện. Thiếu 1 điều = không tạo đơn."),
      table(
        ["#", "Điều kiện", "Nếu thiếu"],
        [
          ["1", "Khách chọn đúng 1 trong 3 set", "Hỏi lại, không đoán"],
          ["2", "SĐT 10 số Việt Nam", "Xin SĐT, không chốt ẩn danh"],
          ["3", "Địa chỉ có tỉnh/thành", "Hỏi tỉnh trước số nhà"],
          ["4", "Tồn kho set > 0", "Đề xuất set còn hoặc danh sách chờ"],
          ["5", "Ngày hiện tại ≤ mốc giao của tỉnh đó", "Nói không kịp, không nhận rồi im"],
        ],
        [800, 4280, 4280]
      ),
      new Paragraph({ spacing: { after: 160 }, children: [] }),
      p("Khi đủ 5 điều kiện, hệ thống làm tuần tự: trừ mềm tồn kho → tạo mã NCT-xxxx → gửi tin xác nhận (set, giá, COD, ngày giao hứa) → đẩy đơn vào bảng Đơn + thông báo bạn. Khách được quyền sửa địa chỉ trong 2 giờ. Sau 2 giờ khóa để kho đóng hộp."),
      p("Thanh toán mặc định COD. Không cho bot tự yêu cầu chuyển khoản trước — dễ bị hiểu nhầm lừa đảo, và không cần với đơn 399–999k."),
      p("Đơn “xám” (tỉnh xa sau 25/01, khách muốn mix set, khách gửi 3 ảnh nhà lệch nhau) luôn vào hàng đợi người. Tỷ lệ mục tiêu: AI tự chốt 60–70% inbox; 30–40% còn lại là đơn chất lượng cao hơn, không phải thất bại của bot."),

      h(2, "5.1 Đồng bộ kênh bán"),
      bullet("Landing form COD và inbox Zalo/Facebook ghi vào cùng bảng Đơn. Một khách một SĐT. Tránh hai đơn trùng."),
      bullet("TikTok Shop nếu mở: đơn marketplace đi đường riêng (phí sàn, đối soát sàn). Bot inbox không được hứa giá landing trên đơn TikTok Shop."),
      bullet("Tồn kho là một số dùng chung. Hết set 699 thì bot, landing và bài đăng đều đổi CTA sang 399/999 trong vòng 5 phút."),

      h(1, "6. Tầng 3 — Đăng bài tự động"),
      p("Đăng bài không phải “AI nghĩ caption rồi bấm đăng”. Là nhà máy nội dung 1 phòng – 3 set – nhiều biến thể."),

      h(2, "6.1 Nguyên liệu (quay 1 lần, cắt cả mùa)"),
      bullet("1 phòng khách kem + sofa trung tính: timelapse 15s, hero 8s, cận từng món, ban ngày, unbox."),
      bullet("Mỗi clip gắn đúng 1 set. Ads TikTok nào thì landing mở đúng neo set đó."),
      bullet("Không để AI tự bịa góc nhà khác với hàng gửi đi."),

      h(2, "6.2 Máy soạn bài"),
      p("Mỗi ngày hệ thống đề xuất 3–5 bài theo khuôn:"),
      table(
        ["Loại", "Hook 3s", "CTA"],
        [
          ["Trước/sau", "Phòng trống → 8 giây có Tết", "Set 699k + link"],
          ["Phản đối", "Mai giả? Cận ban ngày", "Zalo gửi ảnh tường"],
          ["Deadline", "Còn X ngày tới 23 Chạp", "Chốt hôm nay"],
          ["Theo nhà", "Chung cư 70m² treo gì", "Đúng 1 set"],
          ["Ugc giả lập", "Góc nhà mẫu, nói thẳng là mẫu", "Hỏi nhà bạn giống không"],
        ],
        [2200, 3580, 3580]
      ),
      new Paragraph({ spacing: { after: 160 }, children: [] }),
      p("Lịch tuần mẫu trước Tết: Thứ 2–4–6 TikTok (set 699). Thứ 3–5 Reels/Facebook (set cửa + cả nhà). Chủ nhật 1 bài deadline. Không đăng 4 bài/ngày — kênh nhỏ đăng dày bị chết tương tác."),

      h(2, "6.3 Quyền đăng"),
      p("Tháng đầu: AI soạn + xếp slot, bạn bấm Duyệt. Sau khi 20 bài đầu không lệch giá/set: cho phép tự đăng khung 11:00 và 19:30, vẫn giữ nút gỡ trong 15 phút. Comment dưới bài do bot trả theo mục 4.3; comment mắng / nghi hàng giả → người."),
      p("Cấm tuyệt đối: bot tự ghép nhạc bản quyền, tự tag KOL, tự chạy ads số tiền mới. Ads do bạn bật tay, creative lấy từ kho đã duyệt."),

      h(1, "7. Kiến trúc kỹ thuật đề xuất"),
      p("Stack đủ xài cho shop 3 SKU, không xây “nền tảng AI”."),
      table(
        ["Lớp", "Chọn", "Ghi chú"],
        [
          ["Kênh", "Zalo OA API + Meta Messenger + TikTok inbox (nếu mở được)", "OA cần gói Growth trở lên"],
          ["Bộ não", "LLM + RAG trên catalog/chính sách", "Grok / model bất kỳ qua API, không train lại"],
          ["Công cụ", "create_order, check_stock, get_deadline, draft_post", "Model chỉ được gọi tool, không tự ghi DB"],
          ["Kho", "PostgreSQL (đơn, khách) + object storage (ảnh/clip)", "Landing hiện lưu local; lúc live chuyển DB"],
          ["Hàng đợi", "Webhook → queue → worker", "Tránh timeout Zalo/Meta"],
          ["Duyệt bài", "Bảng lịch + nút duyệt mobile", "30 ngày đầu bắt buộc"],
          ["Báo cáo", "Zalo/email 07:30 mỗi sáng", "Inbox, đơn, tồn, bài đã lên"],
        ],
        [1800, 3780, 3780]
      ),
      new Paragraph({ spacing: { after: 160 }, children: [] }),
      p("Landing hiện tại giữ vai trò “trang chốt sau ads”. Hệ thống mới không thay landing — nó đọc đơn từ landing và trả khách vào đúng set."),

      h(1, "8. An toàn vận hành mùa Tết"),
      bullet("Bot không được nói “giao trước Tết” nếu hôm nay đã qua mốc tỉnh của khách."),
      bullet("Bot không được nhận đặt mai tươi / hàng cúng / set custom."),
      bullet("Mỗi đơn tự chốt gửi 1 tin cho bạn. Im lặng = hệ thống hỏng, không phải “đang chạy tốt”."),
      bullet("Khi tồn set 699 < 10: khóa tự đăng bài set đó, chuyển CTA."),
      bullet("Nhân lúc cao điểm 15–30/01: luôn có 1 người trực 20:00–23:00. Bot không thay ca đêm sát Tết."),
      bullet("Giữ log hội thoại 90 ngày để xử lý khiếu nại “bot hứa một đằng”."),

      h(1, "9. Chỉ số theo dõi"),
      table(
        ["Chỉ số", "Mục tiêu 30 ngày đầu", "Cờ đỏ"],
        [
          ["Tỷ lệ inbox được bot trả < 60s", "> 85%", "< 60%"],
          ["Tỷ lệ AI tự chốt / tổng đơn", "50–70%", "> 85% (đang chốt ẩu)"],
          ["Đơn hủy vì sai set / sai size", "< 8%", "> 15%"],
          ["Đơn trễ mốc Tết do hứa sai", "0", "≥ 1"],
          ["Tồn set 699 đồng bộ 3 kênh", "< 5 phút lệch", "Bán âm"],
          ["Bài đăng lệch giá / lệch set", "0", "Gỡ ngay"],
        ],
        [3200, 3080, 3080]
      ),

      h(1, "10. Lộ trình 4 tuần (trước khi cao điểm Tết)"),
      p("Hôm nay 21/09, còn khoảng 4 tháng tới Tết. Không cần xong hết trong tuần. Xong đúng thứ tự:"),
      table(
        ["Tuần", "Làm", "Xong khi"],
        [
          ["1", "Chốt catalog 3 set + thẻ bán hàng + mốc giao theo tỉnh", "Bot trả lời đúng trên giấy, chưa nối kênh"],
          ["2", "Zalo OA + webhook + bot inbox có cổng 5 điều kiện", "Tự chốt đơn test nội bộ"],
          ["3", "Nối Facebook Messenger + form landing vào cùng bảng Đơn", "Một SĐT không ra hai đơn"],
          ["4", "Kho clip + máy soạn bài + duyệt tay", "5 bài/tuần lên đúng set"],
        ],
        [1400, 4580, 3380]
      ),
      new Paragraph({ spacing: { after: 160 }, children: [] }),
      p("Tháng 11–12: chạy ads nhỏ, đo tỷ lệ chốt, sửa câu phản đối. Tháng 1/2027: khóa thay đổi giá và SKU. 15/01 trở đi: không thêm tính năng, chỉ trực đơn."),

      h(1, "11. Chi phí thô (tham khảo)"),
      table(
        ["Hạng mục", "Mức", "Bắt buộc?"],
        [
          ["Zalo OA gói Growth (API)", "~2,5 triệu/năm", "Có, nếu chốt trên Zalo"],
          ["LLM API tư vấn", "Vài trăm nghìn–vài triệu/tháng tùy số inbox", "Có"],
          ["Server + DB nhỏ", "200–500 nghìn/tháng", "Có khi rời máy local"],
          ["Meta Messenger / TikTok tool", "0 nếu tự webhook; phí nếu dùng phần mềm sẵn", "Tùy"],
          ["Người duyệt bài + trực đêm sát Tết", "Công sức, không tự động hóa được", "Có"],
        ],
        [3200, 3580, 2580]
      ),
      new Paragraph({ spacing: { after: 160 }, children: [] }),
      p("Không mua “gói AI all-in-one” trước khi catalog và mốc giao nằm trong bảng. Phần mềm không cứu được dữ liệu rối."),

      h(1, "12. Việc làm ngay tuần này"),
      bullet("Khóa 3 set, 3 giá, 2 mốc giao — viết thành 1 trang “bot được phép nói gì”."),
      bullet("Mở Zalo OA và xác định đã có gói API chưa."),
      bullet("Gom clip phòng mẫu thành thư mục theo set, đặt tên file trùng id sản phẩm."),
      bullet("Quyết định SĐT Zalo thật để thay số đang để trên landing."),
      bullet("Chọn: tự dựng webhook hay dùng phần mềm sẵn (Manychat / chatbot Zalo nội địa) cho 30 ngày đầu. Shop 3 SKU: phần mềm sẵn nhanh hơn tự code."),

      h(1, "13. Ranh giới trách nhiệm"),
      p("AI chịu trách nhiệm tốc độ và sự nhất quán. Bạn chịu trách nhiệm hàng đúng clip, đóng gói còn nguyên, và lời hứa giao Tết. Hệ thống này thắng khi khách thấy shop trả lời như người bán hiểu nhà họ — không khi bot nói nhiều hơn người."),
      p("Hết báo cáo. Bước tiếp theo nếu cần: mình soạn thẻ bán hàng 3 set (câu bot được phép nói) hoặc kịch bản 8 tình huống inbox để dán vào Zalo OA / Manychat.", { after: 80 }),
    ],
  }],
});

const buf = await Packer.toBuffer(doc);
const out = "/home/workdir/artifacts/Bao_cao_he_thong_AI_Nha_Co_Tet.docx";
fs.writeFileSync(out, buf);
console.log("wrote", out, buf.length);
