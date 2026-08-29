# Kết nối Google Sheets

Trang quản lý dùng file local khi phát triển. Khi deploy lên Vercel hoặc hosting không có ổ đĩa bền vững, cấu hình Google Sheets để mọi phản hồi được lưu tập trung.

1. Tạo một Google Sheet mới và lấy ID nằm giữa `/d/` và `/edit` trong URL.
2. Mở **Extensions → Apps Script**, dán nội dung từ `scripts/google-apps-script.gs`.
3. Trong Apps Script, mở **Project Settings → Script Properties** và thêm:
   - `SPREADSHEET_ID`: ID của Sheet.
   - `SHARED_SECRET`: một chuỗi bí mật dài, tự đặt.
4. Chọn **Deploy → New deployment → Web app**, đặt **Execute as: Me** và **Who has access: Anyone**. Sao chép URL `/exec`.
5. Thêm các biến môi trường trên hosting:
   - `GOOGLE_SHEETS_WEBHOOK_URL`: URL `/exec` vừa sao chép.
   - `GOOGLE_SHEETS_SHARED_SECRET`: giống `SHARED_SECRET` trong Apps Script.
   - `ADMIN_PASSWORD`: mật khẩu mở trang `/quan-ly`.
   - `ADMIN_SESSION_SECRET`: chuỗi ngẫu nhiên dài để ký phiên đăng nhập.

Sau khi deploy lại, trang `/quan-ly` sẽ hiển thị nguồn dữ liệu là **Google Sheets**.
