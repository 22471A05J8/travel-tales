import React, { useState } from "react";
import GuideSearchForm from "./GuideSearchFrom";// ✅ Fix typo: "GuideSearchFrom" → "GuideSearchForm"
import GuideList from "./GuideList";

const allGuides = [
  {name: "Rajesh",image: "https://i.pinimg.com/474x/4a/5c/2f/4a5c2f2a828314d79432bb91afeb3ef3.jpg",phone: "+91 9876543210",language: "Telugu",cost: 1000,source: "Taj Mahal",destination: "Great Wall of China",},
  {name: "Swathi",image: "https://thumbs.dreamstime.com/b/passport-photo-portrait-asian-smiling-woman-112116605.jpg",phone: "+91 9123456789",language: "English",cost: 1000,source: "Taj Mahal",destination: "Great Wall of China",},
  {name: "Doe",image: "https://i.pinimg.com/originals/6b/7e/d6/6b7ed698713c09ad9e6afc7dcb996a09.jpg",phone: "+91 8000000000",language: "Hindi",cost: 1000, source: "Taj Mahal",destination: "Great Wall of China",},
  
  {name: " Kumar",image: "https://randomuser.me/api/portraits/men/1.jpg",phone: "+91 9897543210",language: "Telugu",cost: 2000,source: "Taj Mahal",destination: "Great Wall of China",},
  {name: "Reddy",image: "https://randomuser.me/api/portraits/women/2.jpg",phone: "+91 8943456789",language: "English",cost: 2000,source: "Taj Mahal",destination: "Great Wall of China",},
  {name: "John ",image: "https://randomuser.me/api/portraits/men/3.jpg",phone: "+91 3283400764",language: "Hindi",cost: 2000, source: "Taj Mahal",destination: "Great Wall of China",},
  
  {name: "harshi",image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHAjEmiHpOUELiMDsI_KAdNz8AHQVpTnCqNlUkyhAKg2JFXT7edft1JGkQsZKT1lhEYuA&usqp=CAU",phone: "+91 987328210",language: "Telugu",cost: 3000,source: "Taj Mahal",destination: "Great Wall of China",},
  {name: "Ramya",image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRjsH-4jhxk6WU8cm7evR0pZ6F_HDPJAelhQ&s",phone: "+91 9399456789",language: "English",cost: 3000,source: "Taj Mahal",destination: "Great Wall of China",},
  {name: "Murali",image: "https://i.pinimg.com/736x/ad/2c/df/ad2cdf34f3f1947cf50a7b1c374a985e.jpg",phone: "+91 832122200",language: "Hindi",cost: 3000, source: "Taj Mahal",destination: "Great Wall of China",},
  
  {name: "Ramya",image: "https://i.pinimg.com/736x/65/7c/be/657cbe674b977b14c121199fc7d4be41.jpg",phone: "+91 9897543210",language: "Telugu",cost: 4000,source: "Taj Mahal",destination: "Great Wall of China",},
  {name: "Sneha",image: "https://i.pinimg.com/736x/8c/6a/78/8c6a785483ee3e92d8163f2fac2cc567.jpg",phone: "+91 8943426749",language: "English",cost:4000,source: "Taj Mahal",destination: "Great Wall of China",},
  {name: "Jabili",image: "https://passport-photo.online/images/cms/prepare_light_b364e3ec37.webp?quality=80&format=webp&width=1920",phone: "+91 3283403324",language: "Hindi",cost: 4000, source: "Taj Mahal",destination: "Great Wall of China",},

  {name: "Raji",image: "https://t4.ftcdn.net/jpg/10/17/46/67/360_F_1017466748_sPimgAiwEJECag85DWHsrufuLsugsh6b.jpg",phone: "+91 3586743210",language: "Telugu",cost: 5000,source: "Taj Mahal",destination: "Great Wall of China",},
  {name: "mohan",image: "https://i.pinimg.com/222x/f5/3e/c6/f53ec61db2e49c82b057554cb4a0cb91.jpg",phone: "+91 8403726749",language: "English",cost:5000,source: "Taj Mahal",destination: "Great Wall of China",},
  {name: "karthik",image: "https://i.pinimg.com/originals/4c/cd/08/4ccd086a8b7970c7a1ab4961e9bfcafc.jpg",phone: "+91 3283845324",language: "Hindi",cost: 5000, source: "Taj Mahal",destination: "Great Wall of China",},
  

  
  {name: "karthikaa",image: "https://i.pinimg.com/474x/4a/5c/2f/4a5c2f2a828314d79432bb91afeb3ef3.jpg",phone: "+91 9876543210",language: "Telugu",cost: 1000,source: "Taj Mahal",destination: "Petra",},
  {name: "Sowmya",image: "https://thumbs.dreamstime.com/b/passport-photo-portrait-asian-smiling-woman-112116605.jpg",phone: "+91 9123456789",language: "English",cost: 1000,source: "Taj Mahal",destination: "Petra",},
  {name: "manu",image: "https://i.pinimg.com/originals/6b/7e/d6/6b7ed698713c09ad9e6afc7dcb996a09.jpg",phone: "+91 8000000000",language: "Hindi",cost: 1000, source: "Taj Mahal",destination: "Petra",},
  
  {name: "mrunal",image: "https://i.pinimg.com/474x/4a/5c/2f/4a5c2f2a828314d79432bb91afeb3ef3.jpg",phone: "+91 9876543210",language: "Telugu",cost: 2000,source: "Taj Mahal",destination: "Petra",},
  {name: "maruthi",image: "https://thumbs.dreamstime.com/b/passport-photo-portrait-asian-smiling-woman-112116605.jpg",phone: "+91 9123456789",language: "English",cost: 2000,source: "Taj Mahal",destination: "Petra",},
  {name: "tanu",image: "https://i.pinimg.com/originals/6b/7e/d6/6b7ed698713c09ad9e6afc7dcb996a09.jpg",phone: "+91 8000000000",language: "Hindi",cost: 2000, source: "Taj Mahal",destination: "Petra",},
  
  {name: "ashok",image: "https://i.pinimg.com/474x/4a/5c/2f/4a5c2f2a828314d79432bb91afeb3ef3.jpg",phone: "+91 9876543210",language: "Telugu",cost: 3000,source: "Taj Mahal",destination: "Petra",},
  {name: "venky",image: "https://t4.ftcdn.net/jpg/07/92/37/17/360_F_792371799_SYRZRLqm9r1jK36rfF6I2CwA1VR4Ele0.jpg",phone: "+91 9123456789",language: "English",cost: 3000,source: "Taj Mahal",destination: "Petra",},
  {name: "banu",image: "https://i.pinimg.com/originals/6b/7e/d6/6b7ed698713c09ad9e6afc7dcb996a09.jpg",phone: "+91 8000000000",language: "Hindi",cost: 3000, source: "Taj Mahal",destination: "Petra",},
  
  {name: "aruna",image: "https://i.pinimg.com/474x/4a/5c/2f/4a5c2f2a828314d79432bb91afeb3ef3.jpg",phone: "+91 9876543210",language: "Telugu",cost: 4000,source: "Taj Mahal",destination: "Petra",},
  {name: "babu",image: "https://connect.cept.ac.in/UserProfilePhoto/UA1212_K00fr7244A8LP1RU3KhLPa42.jpg",phone: "+91 9123456789",language: "English",cost: 4000,source: "Taj Mahal",destination: "Petra",},
  {name: "suresh",image: "https://research.iitgn.ac.in/sseg/wp-content/uploads/2021/01/image-28.png",phone: "+91 8000000000",language: "Hindi",cost: 4000, source: "Taj Mahal",destination: "Petra",},
  
  {name: "haroini",image: "https://images.squarespace-cdn.com/content/v1/66ac14cf979e1403a5861d79/b56b7206-afec-45b6-a9b8-bfc8e99b18b4/Australian+Passport-Daughter-Small.jpg",phone: "+91 9876543210",language: "Telugu",cost: 5000,source: "Taj Mahal",destination: "Petra",},
  {name: "shiva",image: "https://i.pinimg.com/736x/56/40/db/5640db4eb11ea60d7a0c6a565cb9aa0f.jpg",phone: "+91 9123456789",language: "English",cost: 5000,source: "Taj Mahal",destination: "Petra",},
  {name: "bindu",image: "https://i.pinimg.com/originals/6b/7e/d6/6b7ed698713c09ad9e6afc7dcb996a09.jpg",phone: "+91 8000000000",language: "Hindi",cost: 5000, source: "Taj Mahal",destination: "Petra",},
  


  {name: "hani",image: "https://photobi.hk/wp-content/uploads/2019/11/1704a2-480x600.jpg",phone: "+91 9876543210",language: "Telugu",cost: 5000,source: "Taj Mahal",destination: "Chichen Itza",},
  {name: "shiv",image: "https://thumbs.dreamstime.com/b/passport-photo-portrait-asian-smiling-woman-112116605.jpg",phone: "+91 9123456789",language: "English",cost: 5000,source: "Taj Mahal",destination: "Chichen Itza",},
  {name: "kusuma",image: "https://timesofindia.indiatimes.com/photo/77002117.cms",phone: "+91 8000000000",language: "Hindi",cost: 5000, source: "Taj Mahal",destination: "Chichen Itza",},
  
  {name: "joseph",image: "https://i.pinimg.com/736x/6b/7e/d6/6b7ed698713c09ad9e6afc7dcb996a09.jpg",phone: "+91 9876543210",language: "Telugu",cost: 4000,source: "Taj Mahal",destination: "Chichen Itza",},
  {name: "ramesh",image: "https://i.pinimg.com/236x/6a/c0/0c/6ac00c3bd7b8a2b131bc8b9b4a544863.jpg",phone: "+91 9123456789",language: "English",cost: 4000,source: "Taj Mahal",destination: "Chichen Itza",},
  {name: "naveen",image: "https://thumbs.dreamstime.com/b/passport-picture-hispanic-businessman-suit-white-background-cut-out-54531886.jpg",phone: "+91 8000000000",language: "Hindi",cost: 4000, source: "Taj Mahal",destination: "Chichen Itza",},

  {name: "koushik",image: "https://www.shutterstock.com/image-photo/passport-photo-man-on-white-260nw-2537386563.jpg",phone: "+91 9876543210",language: "Telugu",cost: 3000,source: "Taj Mahal",destination: "Chichen Itza",},
  {name: "madhav",image: "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg",phone: "+91 9123456789",language: "English",cost: 3000,source: "Taj Mahal",destination: "Chichen Itza",},
  {name: "mouni",image: "https://i.pinimg.com/originals/6b/7e/d6/6b7ed698713c09ad9e6afc7dcb996a09.jpg",phone: "+91 8000000000",language: "Hindi",cost: 3000, source: "Taj Mahal",destination: "Chichen Itza",},
  
  {name: "chinmayee",image: "https://static.vecteezy.com/system/resources/thumbnails/048/319/112/small/travelling-holidays-summer-concept-serious-looking-young-confident-girl-showing-her-brand-new-passport-ready-to-travel-abroad-packing-up-baggage-standing-white-background-photo.jpg",phone: "+91 9876543210",language: "Telugu",cost: 2000,source: "Taj Mahal",destination: "Chichen Itza",},
  {name: "yamini",image: "https://c.superprof.com/i/a/15050770/8753192/600/20240722084017/phonics-class-for-kids-online-class-years-experiencef-tutor-happy-learning.jpg",phone: "+91 9123456789",language: "English",cost: 2000,source: "Taj Mahal",destination: "Chichen Itza",},
  {name: "padhyma",image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5bEydXXCNjpv0QbocNfdaoplEQjZHiAxewg&s",phone: "+91 8000000000",language: "Hindi",cost: 2000, source: "Taj Mahal",destination: "Chichen Itza",},
  
  {name: "hari",image: "https://previews.123rf.com/images/koldunov/koldunov1812/koldunov181200364/115199208-passport-photo-portrait-of-european-young-woman-in-blue-shirt.jpg",phone: "+91 9876543210",language: "Telugu",cost: 1000,source: "Taj Mahal",destination: "Chichen Itza",},
  {name: "ammu",image: "https://images.bhaskarassets.com/web2images/521/2023/06/20/app_1687172630649036160b35d_image-33053.jpg",phone: "+91 9123456789",language: "English",cost: 1000,source: "Taj Mahal",destination: "Chichen Itza",},
  {name: "pritya",image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7yQGM6iQdwebyyuBmiwJVg9cS2MdwOPuESERJrXhBpxg70B7YTmd6e6ItoTZQ_ZvcnLc&usqp=CAUg",phone: "+91 8000000000",language: "Hindi",cost: 1000, source: "Taj Mahal",destination: "Chichen Itza",},
   


  
  {name: "amulya",image: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFzc3BvcnQlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",phone: "+91 9876543210",language: "Telugu",cost: 1000,source: "Taj Mahal",destination: "Christ the Redeemer",},
  {name: "nandini",image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpGB3mLhQN6i6T27N9d3K8DrtUsU3dtLfnpg&s",phone: "+91 9123456789",language: "English",cost: 1000,source: "Taj Mahal",destination: "Christ the Redeemer",},
  {name: "priya",image: "https://pics.craiyon.com/2024-09-02/7OcQy__mT_-d4hI54eaXeQ.webp",phone: "+91 8000000000",language: "Hindi",cost: 1000, source: "Taj Mahal",destination: "Christ the Redeemer",},
   
  {name: "jaya",image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.photogptai.com%2Fpresets%2Fpassport&psig=AOvVaw2NNuCBFTS_VcCqG9Km1sFk&ust=1752415934891000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIjByLbAt44DFQAAAAAdAAAAABAE",phone: "+91 9876543210",language: "Telugu",cost: 1000,source: "Taj Mahal",destination: "Christ the Redeemer",},
  {name: "sai",image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-ai-image%2Fpassport-photo-portrait-young-man-white-background_290007500.htm&psig=AOvVaw2NNuCBFTS_VcCqG9Km1sFk&ust=1752415934891000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIjByLbAt44DFQAAAAAdAAAAABAL",phone: "+91 9123456789",language: "English",cost: 1000,source: "Taj Mahal",destination: "Christ the Redeemer",},
  {name: "anannya",image: "https://www.google.com/imgres?q=passport%20size%20photo%20images%20humans%20or%20ai&imgurl=https%3A%2F%2Fpassport-photo.online%2Fimages%2Fcms%2Fafter_image_3bf0612bd7.webp%3Fquality%3D80%26format%3Dwebp%26width%3D1080&imgrefurl=https%3A%2F%2Fpassport-photo.online%2Fus-passport-photo%3Fsrsltid%3DAfmBOooKCfDSJfAQzzjtr2TQxS5-9ynR0PyraNnB8PB3kczIjmunu9JY&docid=Y8t3wqNU3FJqDM&tbnid=MJHbiphCM1NBCM&vet=12ahUKEwjuv-CawLeOAxX-U2wGHaNhKXIQM3oECGYQAA..i&w=1080&h=1080&hcb=2&ved=2ahUKEwjuv-CawLeOAxX-U2wGHaNhKXIQM3oECGYQAA",phone: "+91 8000000000",language: "Hindi",cost: 1000, source: "Taj Mahal",destination: "Christ the Redeemer",},



  {name: "anu",image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fexpresspasspicsusa.wordpress.com%2Fwp-content%2Fuploads%2F2016%2F12%2Fpassport-photo-online.jpg%3Fw%3D500&tbnid=vnvtbT_Z7puDVM&vet=10CBgQxiAoC2oXChMIiMHItsC3jgMVAAAAAB0AAAAAEBs..i&imgrefurl=https%3A%2F%2Fexpresspasspicsusa.wordpress.com%2F2016%2F12%2F27%2Fhow-to-take-an-acceptable-photo-for-the-united-states-passport-application%2F&docid=K1Vfz-8NopY4AM&w=500&h=667&itg=1&q=passport%20size%20photo%20images%20humans%20or%20ai&ved=0CBgQxiAoC2oXChMIiMHItsC3jgMVAAAAAB0AAAAAEBs",phone: "+91 9876543210",language: "Telugu",cost: 2000,source: "Taj Mahal",destination: "Christ the Redeemer",},
  {name: "sri",image: "https://www.google.com/imgres?q=passport%20size%20photo%20images%20humans%20or%20ai&imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-photo%2Fpassport-photo-real-young-woman-260nw-2274107825.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Ffemale-passport-photo&docid=fiVw14BIn_gQQM&tbnid=tyS_02owr-TMIM&vet=12ahUKEwjuv-CawLeOAxX-U2wGHaNhKXIQM3oECHgQAA..i&w=193&h=280&hcb=2&ved=2ahUKEwjuv-CawLeOAxX-U2wGHaNhKXIQM3oECHgQAA",phone: "+91 9123456789",language: "English",cost: 2000,source: "Taj Mahal",destination: "Christ the Redeemer",},
  {name: "priya",image: "https://www.google.com/imgres?q=passport%20size%20photo%20images%20humans%20or%20ai&imgurl=https%3A%2F%2Fpassport-photo.online%2Fimages%2Fbefore-after%2Fbefore%2Fdefault.png&imgrefurl=https%3A%2F%2Fpassport-photo.online%2Fen-in&docid=Dm2NVkUE_l45YM&tbnid=iZ5Sul7reeX9KM&vet=12ahUKEwjO1KP9wbeOAxV4cGwGHcMMHpoQM3oECGcQAA..i&w=255&h=299&hcb=2&itg=1&ved=2ahUKEwjO1KP9wbeOAxV4cGwGHcMMHpoQM3oECGcQAA",phone: "+91 8000000000",language: "Hindi",cost: 2000, source: "Taj Mahal",destination: "Christ the Redeemer",},



  {name: "srinu",image: "https://www.google.com/imgres?q=passport%20size%20photo%20images%20humans%20or%20ai&imgurl=https%3A%2F%2Fimages.segmind.com%2Foutputs%2F754ab895-9d9e-4b07-95eb-a4f3427f8f2a.jpg&imgrefurl=https%3A%2F%2Fwww.segmind.com%2Fpixelflows%2Fai-passport-photo-generator&docid=yB5clCPmnbIr3M&tbnid=tcEWm1W_cbiGXM&vet=12ahUKEwjuv-CawLeOAxX-U2wGHaNhKXIQM3oECFQQAA..i&w=1024&h=1024&hcb=2&ved=2ahUKEwjuv-CawLeOAxX-U2wGHaNhKXIQM3oECFQQAA",phone: "+91 9876543210",language: "Telugu",cost: 3000,source: "Taj Mahal",destination: "Christ the Redeemer",},
  {name: "tarun",image: "https://www.google.com/imgres?q=passport%20size%20photo%20images%20humans%20or%20ai&imgurl=https%3A%2F%2Fdesignimages.appypie.com%2Fdisplaypicture%2Fdisplaypicture-14-person-human.jpg&imgrefurl=https%3A%2F%2Fwww.appypiedesign.ai%2Fblog%2Fcreate-passport-size-photos&docid=34ozAXY5A5yYLM&tbnid=86aCGyszJZx-EM&vet=12ahUKEwjuv-CawLeOAxX-U2wGHaNhKXIQM3oECHsQAA..i&w=300&h=300&hcb=2&ved=2ahUKEwjuv-CawLeOAxX-U2wGHaNhKXIQM3oECHsQAA",phone: "+91 9123456789",language: "English",cost: 3000,source: "Taj Mahal",destination: "Christ the Redeemer",},
  {name: "prithvi",image: "https://www.google.com/imgres?q=passport%20size%20photo%20images%20humans%20or%20ai&imgurl=https%3A%2F%2Feasy-peasy.ai%2Fcdn-cgi%2Fimage%2Fquality%3D80%2Cformat%3Dauto%2Cwidth%3D700%2Fhttps%3A%2F%2Fmedia.easy-peasy.ai%2F226689c3-8797-4726-9f9b-2063ff49d608%2F4ca00d0e-3a6a-4acb-96c6-e7f7f8ed03e4.png&imgrefurl=https%3A%2F%2Feasy-peasy.ai%2Fai-image-generator%2Fimages%2Fformal-chinese-passport-photo-neutral-expression&docid=Oi_qWyuiX8ClFM&tbnid=qj8eJcXy2GyohM&vet=12ahUKEwjuv-CawLeOAxX-U2wGHaNhKXIQM3oECFwQAA..i&w=700&h=700&hcb=2&ved=2ahUKEwjuv-CawLeOAxX-U2wGHaNhKXIQM3oECFwQAA",phone: "+91 8000000000",language: "Hindi",cost: 3000, source: "Taj Mahal",destination: "Christ the Redeemer",},


  {name: "sham",image: "https://www.google.com/imgres?q=photo%20editor%20male%20passport%20size%20photo%20images%20humans%20or%20ai&imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Fpicture-indian-male-passport-photo-with-short-hair-beard_1046450-20769.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Fpremium-ai-image%2Fpicture-indian-male-passport-photo-with-short-hair-beard_278360892.htm&docid=nYoAtrlOFn8zDM&tbnid=PC-kM8nErrz-ZM&vet=12ahUKEwjCy4bNwreOAxW4afUHHch3OWIQM3oECGUQAA..i&w=626&h=428&hcb=2&ved=2ahUKEwjCy4bNwreOAxW4afUHHch3OWIQM3oECGUQAA",phone: "+91 9876543210",language: "Telugu",cost: 4000,source: "Taj Mahal",destination: "Christ the Redeemer",},
  {name: "madhu",image: "https://www.google.com/imgres?q=passport%20size%20photo%20images%20humans%20or%20ai&imgurl=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fpassport-photo-portrait-asian-smiling-woman-112116605.jpg&imgrefurl=https%3A%2F%2Fwww.dreamstime.com%2Fstock-photo-passport-photo-portrait-asian-smiling-woman-image112116605&docid=4g1g1g1g1g1g1g1g1g1g1g1g1g1g1g1&tbnid=vnvtbT_Z7puDVM&vet=12ahUKEwjCy4bNwreOAxW4afUHHch3OWIQM3oECGUQAA..i&w=626&h=428&hcb=2&ved=2ahUKEwjCy4bNwreOAxW4afUHHch3OWIQM3oECGUQAA",phone: "+91 9123456789",language: "English",cost: 4000,source: "Taj Mahal",destination: "Christ the Redeemer",},
  {name: "srujana",image: "https://www.google.com/imgres?q=passport%20size%20photo%20images%20humans%20or%20ai&imgurl=https%3A%2F%2Fexpresspasspicsusa.wordpress.com%2Fwp-content%2Fuploads%2F2016%2F12%2Fpassport-photo-online.jpg%3Fw%3D500&imgrefurl=https%3A%2F%2Fexpresspasspicsusa.wordpress.com%2F2016%2F12%2F27%2Fhow-to-take-an-acceptable-photo-for-the-united-states-passport-application%2F&docid=K1Vfz-8NopY4AM&tbnid=vnvtbT_Z7puDVM&vet=12ahUKEwig0b_E3LeOAxX6ZmwGHdEvPW4QM3oECHQQAA..i&w=500&h=667&hcb=2&itg=1&ved=2ahUKEwig0b_E3LeOAxX6ZmwGHdEvPW4QM3oECHQQAA",phone: "+91 8000000000",language: "Hindi",cost: 4000, source: "Taj Mahal",destination: "Christ the Redeemer",},


  {name: "venkat",image: "https://www.google.com/imgres?q=passport%20size%20photo%20images%20humans%20or%20ai&imgurl=https%3A%2F%2Fwww.photoforid.com%2Fstatic%2Fimages%2Foriginal.jpg&imgrefurl=https%3A%2F%2Fwww.photoforid.com%2F&docid=p_yvM43j5BtgNM&tbnid=KMlTdXFK8en6HM&vet=12ahUKEwjuv-CawLeOAxX-U2wGHaNhKXIQM3oECEgQAA..i&w=4866&h=5507&hcb=2&ved=2ahUKEwjuv-CawLeOAxX-U2wGHaNhKXIQM3oECEgQAA",phone: "+91 9876543210",language: "Telugu",cost: 5000,source: "Taj Mahal",destination: "Christ the Redeemer",},
  {name: "malli",image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.insmind.com%2Fpassport-photo-maker%2F&psig=AOvVaw2NNuCBFTS_VcCqG9Km1sFk&ust=1752415934891000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDR7sDct44DFQAAAAAdAAAAABAL",phone: "+91 9123456789",language: "English",cost: 5000,source: "Taj Mahal",destination: "Christ the Redeemer",},
  {name: "suresh",image: "https://www.google.com/imgres?q=formal%20passport%20size%20photo%20images%20humans%20or%20ai&imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-photo%2Fpassport-photo-portrait-young-man-260nw-2437772333.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fpassport-photo-suit&docid=OgeKpaO0mNSKwM&tbnid=t8oZlc_VUWUx7M&vet=12ahUKEwjM_Zmm3beOAxXHdvUHHT4IGTIQM3oECBoQAA..i&w=208&h=280&hcb=2&ved=2ahUKEwjM_Zmm3beOAxXHdvUHHT4IGTIQM3oECBoQAA",phone: "+91 8000000000",language: "Hindi",cost: 5000, source: "Taj Mahal",destination: "Christ the Redeemer",},








  {
    name: "Meena Singh",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    phone: "+91 9345678123",
    language: "Hindi",
    cost: 3000,
    source: "Christ the Redeemer",
    destination: "Taj Mahal",
  },
  {
    name: "Anil Verma",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    phone: "+91 8456782311",
    language: "English",
    cost: 5000,
    source: "Petra",
    destination: "Machu Picchu",
  }
];

const Guide = ({ onBooking }) => {
  const [filteredGuides, setFilteredGuides] = useState([]);

  const handleSearch = ({ language, cost, source, destination }) => {
    const results = allGuides.filter(
      (guide) =>
        guide.language === language &&
        guide.cost <= cost &&
        guide.source === source &&
        guide.destination === destination
    );
    setFilteredGuides(results);
  };

  const handleGuideBooking = (guide) => {
    // Generate a random date within the next 3 months for demo purposes
    const today = new Date();
    const futureDate = new Date(today.getTime() + Math.random() * 90 * 24 * 60 * 60 * 1000);
    
    const booking = {
      id: Date.now(),
      type: "guide",
      title: `Tour Guide: ${guide.name}`,
      description: `${guide.language} speaking guide from ${guide.source} to ${guide.destination}`,
      date: futureDate.toISOString().split('T')[0],
      startTime: "09:00",
      endTime: "17:00",
      duration: "8 hours",
      cost: guide.cost,
      status: "Confirmed",
      details: {
        guideName: guide.name,
        guidePhone: guide.phone,
        guideImage: guide.image,
        language: guide.language,
        source: guide.source,
        destination: guide.destination,
        cost: guide.cost
      },
      color: "#27ae60" // Green color for guide bookings
    };
    
    if (onBooking) {
      onBooking(booking);
    }
    
    // Show confirmation message
    alert(`✅ Tour Guide ${guide.name} booked successfully!\n\nDetails:\n- Language: ${guide.language}\n- Route: ${guide.source} → ${guide.destination}\n- Cost: ₹${guide.cost}\n- Date: ${booking.date}\n- Duration: ${booking.duration}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Find Your Tour Guide</h2>
      <GuideSearchForm onSearch={handleSearch} />
      <GuideList guides={filteredGuides} onBooking={handleGuideBooking} />
    </div>
  );
};

export default Guide;
