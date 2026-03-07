export interface Translations {
  lang: {
    choosePicker: string;
    en: string;
    vi: string;
  };
  common: {
    back: string;
    next: string;
    finish: string;
    skip: string;
    continue: string;
    on: string;
    off: string;
    notUpdated: string;
    processing: string;
    viewAll: string;
    add: string;
  };
  nav: {
    home: string;
    aiTryon: string;
    wardrobe: string;
    profile: string;
    scanAvatar: string;
  };
  splash: {
    heading1: string;
    heading2: string;
    heading2Accent: string;
    subtitle: string;
    startBtn: string;
    guestBtn: string;
    securityNote: string;
  };
  onboarding: {
    skip: string;
    slide1: {
      heading: string;
      headingAccent: string;
      description: string;
      cta: string;
    };
    slide2: {
      heading1: string;
      headingAccent: string;
      heading2: string;
      description: string;
      cta: string;
      terms: string;
    };
  };
  auth: {
    login: string;
    register: string;
    email: string;
    password: string;
    confirmPassword: string;
    processing: string;
    continueWithGoogle: string;
    orDivider: string;
    termsNotice: string;
    termsOfService: string;
    and: string;
    privacyPolicy: string;
    of: string;
    logout: string;
  };
  otp: {
    title: string;
    subtitle: string;
    confirm: string;
    resendIn: string;
    resend: string;
  };
  home: {
    title: string;
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    brands: {
      title: string;
    };
    recommended: string;
  };
  wardrobe: {
    filter: string;
    add: string;
    tabs: {
      tops: string;
      bottoms: string;
      shoes: string;
      outfits: string;
    };
  };
  aiStylist: {
    title: string;
    greeting: string;
    prompt1: { title: string; subtitle: string };
    prompt2: { title: string; subtitle: string };
    inputPlaceholder: string;
  };
  profile: {
    stats: {
      items: string;
      clothing: string;
      outfits: string;
      friends: string;
      favorites: string;
    };
    sections: {
      personal: string;
      bodyProfile: string;
      preferences: string;
    };
    fields: {
      fullName: string;
      email: string;
      phone: string;
      dob: string;
      height: string;
      weight: string;
      language: string;
      notifications: string;
    };
    units: {
      metric: string;
      imperial: string;
    };
    actions: {
      startScan: string;
    };
    preferences: {
      aiAlerts: string;
      aiAlertsDesc: string;
      publicWardrobe: string;
      publicWardrobeDesc: string;
    };
    lastScanned: string;
    languageValue: string;
  };
  upload: {
    title: string;
    step: string;
    pageTitle: string;
    garmentPhotos: string;
    frontView: string;
    backView: string;
    required: string;
    tapToUpload: string;
    detailsTags: string;
    optional: string;
    uploadedPreviews: string;
    removeAll: string;
    proTip: string;
    proTipText: string;
    continue: string;
    dropzone: { title: string; subtitle: string };
    camera: string;
    gallery: string;
    category: {
      title: string;
      pageTitle: string;
      heading: string;
      subheading: string;
      top: string;
      tops: string;
      bottom: string;
      bottoms: string;
      dress: string;
      dresses: string;
      shoes: string;
      hats: string;
      accessories: string;
      outerwear: string;
      continueToAnalysis: string;
    };
    attributes: {
      title: string;
      pageTitle: string;
      colorSwatches: string;
      colors: string;
      material: string;
      materialPlaceholder: string;
      brand: string;
      brandPlaceholder: string;
      garmentSize: string;
      size: string;
      processBtn: string;
    };
    processing: {
      title: string;
      constructingMesh: string;
      generating: string;
      approxRemaining: string;
      status1: string;
      status2: string;
      status3: string;
      status4: string;
      step1: string;
      step2: string;
      step3: string;
      step4: string;
      doneTitle: string;
      doneSubtitle: string;
    };
    preview: {
      pageTitle: string;
      front: string;
      back: string;
      side: string;
      generationComplete: string;
      generationSubtitle: string;
      addToWardrobe: string;
      editAttributes: string;
      regenerate: string;
    };
  };
  avatar: {
    setup: {
      title: string;
      heading: string;
      subtitle: string;
      timeEstimate: string;
      getStarted: string;
    };
    measurements: {
      title: string;
      unitMetric: string;
      unitImperial: string;
      visualGuideTitle: string;
      visualGuideSubtitle: string;
      visualGuideDesc: string;
      vitalStats: string;
      heightCm: string;
      heightIn: string;
      weightKg: string;
      weightLbs: string;
      detailedMeasurements: string;
      chest: string;
      chestDesc: string;
      waist: string;
      waistDesc: string;
      hips: string;
      hipsDesc: string;
      continue: string;
    };
    scan: {
      title: string;
      alignBody: string;
      step1Title: string;
      step1Desc: string;
      scanBtn: string;
      skip: string;
      processingTitle: string;
      processingDesc: string;
      generatingMesh: string;
      editTitle: string;
      adjustProportions: string;
      shoulders: string;
      finish: string;
    };
  };
  outfitDuel: {
    title: string;
    subtitle: string;
    synchronizedView: string;
    totalCost: string;
    getLook: string;
    versatility: string;
    trendScore: string;
    vote: string;
  };
  shareLook: {
    background: string;
    caption: string;
    preview: string;
  };
  aiFitAnalysis: {
    uploadTitle: string;
    uploadSubtitle: string;
    analyzeBtn: string;
    results: {
      title: string;
      pageTitle: string;
      fitScore: string;
      goodFit: string;
      goodColor: string;
      waistTooLoose: string;
      recommendedSize: string;
      excellentFit: string;
      excellentFitDesc: string;
      chest: string;
      slightlyTight: string;
      waist: string;
      perfect: string;
      shoulders: string;
      loose: string;
      addSizeToCart: string;
    };
  };
  product: {
    colors: string;
    size: string;
    tryOnAvatar: string;
    addToCart: string;
  };
  header: {
    back: string;
    notifications: string;
  };
}

export const vi: Translations = {
  lang: {
    choosePicker: "Chọn Ngôn Ngữ",
    en: "English (EN)",
    vi: "Tiếng Việt (VI)",
  },
  common: {
    back: "Quay lại",
    next: "Tiếp theo",
    finish: "Hoàn tất",
    skip: "BỎ QUA",
    continue: "Tiếp tục",
    on: "Bật",
    off: "Tắt",
    notUpdated: "Chưa cập nhật",
    processing: "Đang xử lý...",
    viewAll: "Xem tất cả",
    add: "Thêm",
  },
  nav: {
    home: "Trang chủ",
    aiTryon: "Thử đồ AI",
    wardrobe: "Tủ đồ",
    profile: "Hồ sơ",
    scanAvatar: "Quét avatar",
  },
  splash: {
    heading1: "Thử đồ trực tuyến 3D.",
    heading2: "Định hình phong cách với",
    heading2Accent: "AI.",
    subtitle: "Tương lai của thời trang là đây.\nChiêm ngưỡng góc nhìn thực tế trước khi mua.",
    startBtn: "Bắt đầu",
    guestBtn: "Tiếp tục với tư cách Khách",
    securityNote: "Quét 3D bảo mật được trang bị bằng AI",
  },
  onboarding: {
    skip: "BỎ QUA",
    slide1: {
      heading: "Chiêm ngưỡng bản thân\ntrong không gian",
      headingAccent: "3D",
      description:
        "Tạo ảnh đại diện 3D cá nhân qua thao tác quét nhanh, thử màu mọi trang phục dễ dàng bằng công nghệ styling từ AI.",
      cta: "Tiếp tục",
    },
    slide2: {
      heading1: "Phối đồ chuẩn xác",
      headingAccent: "Cùng AI",
      heading2: "Thông minh",
      description:
        "Giao diện linh hoạt học hỏi phong cách của bạn để gợi ý sự kết hợp trang phục hoàn hảo cho mọi dịp.",
      cta: "Bắt đầu",
      terms: "Khi nhấn Bắt đầu, bạn đồng ý với Điều khoản Dịch vụ",
    },
  },
  auth: {
    login: "Đăng nhập",
    register: "Đăng ký",
    email: "Email",
    password: "Mật khẩu",
    confirmPassword: "Xác nhận mật khẩu",
    processing: "Đang xử lý...",
    continueWithGoogle: "Tiếp tục với Google",
    orDivider: "OR",
    termsNotice: "Bằng cách tiếp tục, bạn đồng ý với",
    termsOfService: "Điều khoản dịch vụ",
    and: "và",
    privacyPolicy: "Chính sách bảo mật",
    of: "của Outfy.",
    logout: "Đăng xuất",
  },
  otp: {
    title: "Nhập mã OTP",
    subtitle: "Mã xác thực 6 chữ số đã được gửi đến email của bạn",
    confirm: "Xác nhận",
    resendIn: "Gửi lại sau",
    resend: "Gửi lại mã",
  },
  home: {
    title: "Trang chủ",
    hero: {
      title: "Khám phá tủ đồ",
      subtitle: "Phong cách của bạn bắt đầu ở đây",
      cta: "Thử ngay",
    },
    brands: {
      title: "Thương hiệu nổi bật",
    },
    recommended: "Gợi ý cho bạn",
  },
  wardrobe: {
    filter: "Bộ lọc",
    add: "Thêm",
    tabs: {
      tops: "Áo",
      bottoms: "Quần",
      shoes: "Giày",
      outfits: "Bộ đồ",
    },
  },
  aiStylist: {
    title: "Chuyên gia AI",
    greeting: "Xin chào! Tôi có thể\ngiúp gì cho bạn?",
    prompt1: {
      title: "Gợi ý outfit theo phong cách",
      subtitle: "Tìm trang phục phù hợp với vóc dáng và sở thích của bạn",
    },
    prompt2: {
      title: "Phân tích tủ đồ hiện tại",
      subtitle: "AI sẽ đánh giá và đề xuất cách phối đồ từ tủ của bạn",
    },
    inputPlaceholder: "Hỏi AI Stylist...",
  },
  profile: {
    stats: {
      items: "Món đồ",
      clothing: "Trang phục",
      outfits: "Bộ đồ",
      friends: "Bạn bè",
      favorites: "Yêu thích",
    },
    sections: {
      personal: "Thông tin cá nhân",
      bodyProfile: "Hồ sơ vóc dáng",
      preferences: "Tuỳ chọn",
    },
    fields: {
      fullName: "Họ và tên",
      email: "Email",
      phone: "Điện thoại",
      dob: "Ngày sinh",
      height: "Chiều cao",
      weight: "Cân nặng",
      language: "Ngôn ngữ",
      notifications: "Thông báo",
    },
    units: {
      metric: "Mét",
      imperial: "Inch",
    },
    actions: {
      startScan: "Bắt đầu Quét 3D",
    },
    preferences: {
      aiAlerts: "Thông báo Phong cách AI",
      aiAlertsDesc: "Gợi ý trang phục mới",
      publicWardrobe: "Tủ đồ Công khai",
      publicWardrobeDesc: "Cho phép bạn bè xem phong cách của bạn",
    },
    lastScanned: "Quét lần cuối: 2 ngày trước",
    languageValue: "Tiếng Việt",
  },
  upload: {
    title: "Upload trang phục",
    step: "Bước {{step}}/4",
    pageTitle: "Tải Lên Trang Phục",
    garmentPhotos: "Thêm ảnh trang phục",
    frontView: "Mặt trước (Chính)",
    backView: "Mặt sau",
    required: "BẮT BUỘC",
    tapToUpload: "Nhấn để tải ảnh",
    detailsTags: "Chi tiết / Nhãn",
    optional: "Tuỳ chọn",
    uploadedPreviews: "Ảnh đã tải lên",
    removeAll: "Xóa tất cả",
    proTip: "Mẹo hay",
    proTipText: "Sử dụng nền trung tính và ánh sáng tốt để tạo mô hình 3D chính xác nhất.",
    continue: "Tiếp tục",
    dropzone: {
      title: "Kéo & thả ảnh vào đây",
      subtitle: "hoặc chọn từ thiết bị",
    },
    camera: "Chụp ảnh",
    gallery: "Thư viện",
    category: {
      title: "Chọn danh mục",
      pageTitle: "Danh mục",
      heading: "Loại trang phục này là gì?",
      subheading: "Chọn danh mục phù hợp nhất với ảnh 2D để chuyển đổi 3D.",
      top: "Áo trên",
      tops: "Áo",
      bottom: "Quần",
      bottoms: "Quần",
      dress: "Váy",
      dresses: "Váy",
      shoes: "Giày",
      hats: "Mũ",
      accessories: "Phụ kiện",
      outerwear: "Áo khoác",
      continueToAnalysis: "Tiếp tục phân tích",
    },
    attributes: {
      title: "Thuộc tính",
      pageTitle: "Thuộc tính sản phẩm",
      colorSwatches: "Bảng màu",
      colors: "Màu sắc",
      material: "Chất liệu",
      materialPlaceholder: "VD: Cotton, Polyester, Linen...",
      brand: "Thương hiệu",
      brandPlaceholder: "VD: Modern Tailor",
      garmentSize: "Kích cỡ",
      size: "Kích cỡ",
      processBtn: "Tạo mô hình 3D",
    },
    processing: {
      title: "Đang xử lý",
      constructingMesh: "Đang dựng mô hình",
      generating: "Đang tạo mô hình 3D...",
      approxRemaining: "Còn khoảng {{seconds}}s",
      status1: "Đang phân tích trang phục bằng AI...",
      status2: "Đang xây dựng mesh 3D...",
      status3: "Đang áp dụng chất liệu vải...",
      status4: "Hoàn thiện mô hình...",
      step1: "Đang xử lý ảnh...",
      step2: "Loại bỏ background...",
      step3: "Phân tích màu sắc...",
      step4: "Lưu vào tủ đồ...",
      doneTitle: "Hoàn tất!",
      doneSubtitle: "Trang phục đã được thêm vào tủ đồ",
    },
    preview: {
      pageTitle: "Xem trước 3D",
      front: "Mặt trước",
      back: "Mặt sau",
      side: "Mặt bên",
      generationComplete: "Tạo mô hình hoàn tất",
      generationSubtitle: "Trang phục của bạn đã sẵn sàng được thêm vào tủ đồ.",
      addToWardrobe: "Thêm vào tủ đồ",
      editAttributes: "Chỉnh thuộc tính",
      regenerate: "Tạo lại biến thể",
    },
  },
  avatar: {
    setup: {
      title: "Thiết lập Avatar",
      heading: "Tạo Avatar\n3D Thân Hình",
      subtitle: "Cá nhân hóa trải nghiệm mua sắm\nvà xem trang phục trên số đo thực\ntrước khi mua.",
      timeEstimate: "Ước tính 2-3 phút",
      getStarted: "Bắt đầu",
    },
    measurements: {
      title: "Nhập Số Đo Cơ Thể",
      unitMetric: "cm / kg",
      unitImperial: "inch / lbs",
      visualGuideTitle: "HƯỚNG DẪN ẢNH",
      visualGuideSubtitle: "Avatar 3D Cơ Thể",
      visualGuideDesc: "Sử dụng thước dây mềm để có\nkết quả đo kích thước chính xác nhất.",
      vitalStats: "CHỈ SỐ CHÍNH",
      heightCm: "Chiều cao (cm)",
      heightIn: "Chiều cao (in)",
      weightKg: "Cân nặng (kg)",
      weightLbs: "Cân nặng (lbs)",
      detailedMeasurements: "SỐ ĐO CHI TIẾT",
      chest: "Vòng ngực",
      chestDesc: "Chu vi nơi điểm nở nhất",
      waist: "Vòng eo",
      waistDesc: "Khu vực eo tự nhiên",
      hips: "Vòng hông",
      hipsDesc: "Vị trí nở rộng nhất của hông",
      continue: "Tiếp tục",
    },
    scan: {
      title: "Đang tạo Avatar",
      alignBody: "CĂN CHỈNH",
      step1Title: "Đứng thẳng",
      step1Desc: "Để hai tay hơi dang ra ngoài",
      scanBtn: "QUÉT",
      skip: "Bỏ qua",
      processingTitle: "Đang xử lý ảnh...",
      processingDesc: "AI đang phân tích số đo cơ thể của bạn",
      generatingMesh: "ĐANG TẠO MÔ HÌNH LƯỚI CHI TIẾT",
      editTitle: "Sửa Avatar 3D",
      adjustProportions: "Điều Chỉnh Tỷ Lệ",
      shoulders: "Vai",
      finish: "Hoàn thành",
    },
  },
  outfitDuel: {
    title: "So Sánh Trang Phục",
    subtitle: "Chọn outfit bạn thích nhất",
    synchronizedView: "Xem đồng bộ",
    totalCost: "Tổng chi phí",
    getLook: "Xem ngay",
    versatility: "Tính linh hoạt",
    trendScore: "Điểm xu hướng",
    vote: "Vote ngay",
  },
  shareLook: {
    background: "Nền",
    caption: "Chú thích",
    preview: "Xem trước trang phục",
  },
  aiFitAnalysis: {
    uploadTitle: "Upload trang phục để phân tích",
    uploadSubtitle: "JPG, PNG — tối đa 10MB",
    analyzeBtn: "Phân tích Fit",
    results: {
      title: "Kết quả phân tích",
      pageTitle: "Phân tích độ vừa vặn AI",
      fitScore: "ĐIỂM VỪA VẶN",
      goodFit: "Size phù hợp với số đo của bạn",
      goodColor: "Màu sắc hài hòa với tông da",
      waistTooLoose: "Eo hơi rộng — có thể thử size S",
      recommendedSize: "Kích cỡ đề xuất",
      excellentFit: "Vừa vặn hoàn hảo",
      excellentFitDesc: "Dựa trên số đo của bạn, size M sẽ vừa vặn hoàn hảo ở hầu hết các vị trí với cảm giác hơi rộng ở phần vai.",
      chest: "Vòng ngực",
      slightlyTight: "Hơi chật",
      waist: "Vòng eo",
      perfect: "Vừa vặn",
      shoulders: "Vai",
      loose: "Rộng",
      addSizeToCart: "Thêm size {{size}} vào giỏ",
    },
  },
  product: {
    colors: "Màu sắc",
    size: "Kích cỡ",
    tryOnAvatar: "Thử trên Avatar",
    addToCart: "Thêm giỏ hàng",
  },
  header: {
    back: "Quay lại",
    notifications: "Thông báo",
  },
};
