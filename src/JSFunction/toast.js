import { defineStore } from 'pinia'

export const useToastStore = defineStore({

  id: 'toast',

    state: () => ({
      icon: '',
      title: '',
    }),

  actions: {
    addCartToast(){
      // eslint-disable-next-line no-undef
      Swal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 1500,
        icon: "success",
        iconColor: "#FFFFFF",
        title: "以添加至購物車",
        background: "#00A600",
        color: "#FFFFFF",
        timerProgressBar: true,
      });
    },
    ErroraddCartToast(){
      // eslint-disable-next-line no-undef
      Swal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 1500,
        icon: "error",
        title: "發生錯誤!請先不要新增此商品!",
        background: "#AE0000",
        color: "#FFFFFF",
        timerProgressBar: true,
      });
    },

    showSingupToast(icon, title){
      this.icon = icon
      this.title = title

      // eslint-disable-next-line no-undef
      const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      });
      toast.fire({
        icon: this.icon,
        // "success" 綠勾
        // "error"   紅叉
        title: this.title,
      })
    },

    isLoadingToast(){
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: 'Loading...',
        html: 'Please wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          // eslint-disable-next-line no-undef
          Swal.showLoading()
        }
      });
    },

    SelectSpecColor(){
      // eslint-disable-next-line no-undef
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "請選擇規格!",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
    },

    DeleteItem(){
      return new Promise((resolve) => {
        // eslint-disable-next-line no-undef
        Swal.fire({
          title: "是否刪除?",
          text: "此操作將刪除此商品!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "確認刪除",
          cancelButtonText: "留下它"
        }).then((result) => {
          resolve(result);
        });
      });
    },

    NoSpecColor(){
      return new Promise((resolve) => {
      // eslint-disable-next-line no-undef
        Swal.fire({
          allowOutsideClick: false,
          title: "商品未新增完成!",
          text: "此商品尚未完成禁止使用!",
          icon: "error",
          confirmButtonText: "返回",
        }).then((res) => {
          resolve(res);
        });
      })
    },

    Rule(){
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: '購物約定條款',
        showCloseButton: true,
        showConfirmButton: false,
        html: '<div style="height:200px; overflow-y:auto;">觀自在菩薩。行深般若波羅蜜多時。照見五蘊皆空。度一切苦厄。舍利子。\
        色不異空。空不異色。色即是空。空即是色。受想行識。亦復如是。舍利子。是諸法空相。不生不滅。不垢不淨。不增不減。是故空中無色。\
        無受想行識。無眼耳鼻舌身意。無色聲香味觸法。無眼界。乃至無意識界。無無明。亦無無明盡。乃至無老死。亦無老死盡。無苦集滅道。\
        無智亦無得。以無所得故。菩提薩埵。依般若波羅蜜多故。心無罣礙。無罣礙故。無有恐怖。遠離顛倒夢想。究竟涅槃。三世諸佛。\
        依般若波羅蜜多故。得阿耨多羅三藐三菩提。故知般若波羅蜜多。是大神咒。是大明咒。是無上咒。是無等等咒。能除一切苦。真實不虛。\
        故說般若波羅蜜多咒。即說咒曰。揭諦揭諦 波羅揭諦 波羅僧揭諦 菩提薩婆訶般若波羅蜜多心經</div>',
      })      
    },

    notCheckRule(){
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: '未同意購物約定條款',
        text: "請勾選我同意購物約定條款!",
        icon: "error",
        confirmButtonText: "確認",
      })
    },

    CheckOutOK(){
      return new Promise((resolve) => {
        // eslint-disable-next-line no-undef
        Swal.fire({
          title: '結帳成功',
          text: "商品將於3~5個工作日送達!",
          icon: "success",
          confirmButtonText: "確認",
          allowOutsideClick: false,
        }).then(res=>{
          resolve(res)
        })
      })
    },

    CheckOutErr(){
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: 'Something Error',
        icon: "error",
        showConfirmButton: false,
      })
    },

    doubleCheck(){
      return new Promise((resolve) => {
        // eslint-disable-next-line no-undef
        Swal.fire({
          title: '確認結帳!',
          text: "確認資料無誤後將送出!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "	#CE0000",
          cancelButtonColor: "#00BB00",
          confirmButtonText: "確認結帳",
          cancelButtonText: "等等...",
          allowOutsideClick: false,
        }).then(res=>{
          resolve(res)
        })
      })
    },

    warningToast(title){
      // eslint-disable-next-line no-undef
      Swal.fire({
        icon: "warning",
        title: title,
        confirmButtonText: "確認",
      })
    },

    SendEmailOK(){
      // eslint-disable-next-line no-undef
      Swal.fire({
        icon: "success",
        title: "已寄送郵件!",
        text: "請稍等幾分鐘, 並點擊連結修改密碼!",
        confirmButtonText: "確認",
      })
    },

    ResetPasswordOK(){
      return new Promise((resolve) => {
        // eslint-disable-next-line no-undef
        Swal.fire({
          icon: "success",
          title: "成功修改密碼!",
          text: "請重新登入!",
          confirmButtonText: "確認",
        }).then(res=>{
          resolve(res)
        })
      })
    },

    AccountUpdateOK(){
      // eslint-disable-next-line no-undef
      Swal.fire({
        icon: "success",
        title: "更新成功!",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      })
    },

  }
})