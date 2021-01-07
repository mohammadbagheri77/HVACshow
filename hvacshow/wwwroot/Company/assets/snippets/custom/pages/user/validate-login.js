$("#pnllogin").validate({
    rules: {
        adusername: {
            required: true
        },
        adpassword: {
            required: true
        }
    },
    messages: {
        adusername: {
            required: "نام کاربری را وارد کنید"
        },
        adpassword: {
            required: "رمز عبور را وارد کنید"
        }
    }
});
$("#pnllogin2").validate({
    rules: {
        phone: {
            required: true
        }
    },
    messages: {
        phone: {
            required: "شماره موبایل را وارد کنید"
        }
    }
});
$("#pnllogin3").validate({
    rules: {
        newpw: {
            required: true,
            minlength: 10,
        },
        rnewpw: {
            required: true,
            minlength: 10,
        }
    },
    messages: {
        newpw: {
            required: "رمز عبور جدید را وارد کنید",
            minlength: "حداقل رمز عبور وارد شده باید 10 کاراکتر باشد",
        },
        rnewpw: {
            required: "تکرار رمز عبور جدید را وارد کنید",
            minlength: "حداقل رمز عبور وارد شده باید 10 کاراکتر باشد",
        }
    }
});