! function(a) { "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery) }(function(a) {
    a.extend(a.fn, {
        validate: function(b) {
            if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var c = a.data(this[0], "validator");
            return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function(b) { c.submitButton = b.currentTarget, a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0) }), this.on("submit.validate", function(b) {
                function d() { var d, e; return c.submitButton && (c.settings.submitHandler || c.formSubmitted) && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), !(c.settings.submitHandler && !c.settings.debug) || (e = c.settings.submitHandler.call(c, c.currentForm, b), d && d.remove(), void 0 !== e && e) }
                return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
            })), c)
        },
        valid: function() { var b, c, d; return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function() { b = c.element(this) && b, b || (d = d.concat(c.errorList)) }), c.errorList = d), b },
        rules: function(b, c) {
            var d, e, f, g, h, i, j = this[0],
                k = "undefined" != typeof this.attr("contenteditable") && "false" !== this.attr("contenteditable");
            if (null != j && (!j.form && k && (j.form = this.closest("form")[0], j.name = this.attr("name")), null != j.form)) {
                if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                    case "add":
                        a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                        break;
                    case "remove":
                        return c ? (i = {}, a.each(c.split(/\s/), function(a, b) { i[b] = f[b], delete f[b] }), i) : (delete e[j.name], f)
                }
                return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({ required: h }, g)), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, { remote: h })), g
            }
        }
    });
    var b = function(a) { return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") };
    a.extend(a.expr.pseudos || a.expr[":"], { blank: function(c) { return !b("" + a(c).val()) }, filled: function(c) { var d = a(c).val(); return null !== d && !!b("" + d) }, unchecked: function(b) { return !a(b).prop("checked") } }), a.validator = function(b, c) { this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init() }, a.validator.format = function(b, c) { return 1 === arguments.length ? function() { var c = a.makeArray(arguments); return c.unshift(b), a.validator.format.apply(this, c) } : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) { b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() { return c }) }), b) }, a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(a) { this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a))) },
            onfocusout: function(a) { this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a) },
            onkeyup: function(b, c) {
                var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === c.which && "" === this.elementValue(b) || a.inArray(c.keyCode, d) !== -1 || (b.name in this.submitted || b.name in this.invalid) && this.element(b)
            },
            onclick: function(a) { a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode) },
            highlight: function(b, c, d) { "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d) },
            unhighlight: function(b, c, d) { "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d) }
        },
        setDefaults: function(b) { a.extend(a.validator.defaults, b) },
        messages: { required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date (ISO).", number: "Please enter a valid number.", digits: "Please enter only digits.", equalTo: "Please enter the same value again.", maxlength: a.validator.format("Please enter no more than {0} characters."), minlength: a.validator.format("Please enter at least {0} characters."), rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."), range: a.validator.format("Please enter a value between {0} and {1}."), max: a.validator.format("Please enter a value less than or equal to {0}."), min: a.validator.format("Please enter a value greater than or equal to {0}."), step: a.validator.format("Please enter a multiple of {0}.") },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function b(b) {
                    var c = "undefined" != typeof a(this).attr("contenteditable") && "false" !== a(this).attr("contenteditable");
                    if (!this.form && c && (this.form = a(this).closest("form")[0], this.name = a(this).attr("name")), d === this.form) {
                        var e = a.data(this.form, "validator"),
                            f = "on" + b.type.replace(/^validate/, ""),
                            g = e.settings;
                        g[f] && !a(this).is(g.ignore) && g[f].call(e, this, b)
                    }
                }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var c, d = this.currentForm,
                    e = this.groups = {};
                a.each(this.settings.groups, function(b, c) { "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) { e[c] = b }) }), c = this.settings.rules, a.each(c, function(b, d) { c[b] = a.validator.normalizeRule(d) }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() { return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid() },
            checkForm: function() { this.prepareForm(); for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]); return this.valid() },
            element: function(b) {
                var c, d, e = this.clean(b),
                    f = this.validationTargetFor(e),
                    g = this,
                    h = !0;
                return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function(a, b) { b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a))), e && e.name in g.invalid && (g.currentElements.push(e), h = g.check(e) && h)) }), c = this.check(f) !== !1, h = h && c, c ? this.invalid[f.name] = !1 : this.invalid[f.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h
            },
            showErrors: function(b) {
                if (b) {
                    var c = this;
                    a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function(a, b) { return { message: a, element: c.findByName(b)[0] } }), this.successList = a.grep(this.successList, function(a) { return !(a.name in b) })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(b)
            },
            resetElements: function(a) {
                var b;
                if (this.settings.unhighlight)
                    for (b = 0; a[b]; b++) this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);
                else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            },
            numberOfInvalids: function() { return this.objectLength(this.invalid) },
            objectLength: function(a) { var b, c = 0; for (b in a) void 0 !== a[b] && null !== a[b] && a[b] !== !1 && c++; return c },
            hideErrors: function() { this.hideThese(this.toHide) },
            hideThese: function(a) { a.not(this.containers).text(""), this.addWrapper(a).hide() },
            valid: function() { return 0 === this.size() },
            size: function() { return this.errorList.length },
            focusInvalid: function() { if (this.settings.focusInvalid) try { a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").trigger("focus").trigger("focusin") } catch (b) {} },
            findLastActive: function() { var b = this.lastActive; return b && 1 === a.grep(this.errorList, function(a) { return a.element.name === b.name }).length && b },
            elements: function() {
                var b = this,
                    c = {};
                return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    var d = this.name || a(this).attr("name"),
                        e = "undefined" != typeof a(this).attr("contenteditable") && "false" !== a(this).attr("contenteditable");
                    return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), e && (this.form = a(this).closest("form")[0], this.name = d), this.form === b.currentForm && (!(d in c || !b.objectLength(a(this).rules())) && (c[d] = !0, !0))
                })
            },
            clean: function(b) { return a(b)[0] },
            errors: function() { var b = this.settings.errorClass.split(" ").join("."); return a(this.settings.errorElement + "." + b, this.errorContext) },
            resetInternals: function() { this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]) },
            reset: function() { this.resetInternals(), this.currentElements = a([]) },
            prepareForm: function() { this.reset(), this.toHide = this.errors().add(this.containers) },
            prepareElement: function(a) { this.reset(), this.toHide = this.errorsFor(a) },
            elementValue: function(b) {
                var c, d, e = a(b),
                    f = b.type,
                    g = "undefined" != typeof e.attr("contenteditable") && "false" !== e.attr("contenteditable");
                return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && "undefined" != typeof b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = g ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/"), d >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c)) : "string" == typeof c ? c.replace(/\r/g, "") : c)
            },
            check: function(b) {
                b = this.validationTargetFor(this.clean(b));
                var c, d, e, f, g = a(b).rules(),
                    h = a.map(g, function(a, b) { return b }).length,
                    i = !1,
                    j = this.elementValue(b);
                "function" == typeof g.normalizer ? f = g.normalizer : "function" == typeof this.settings.normalizer && (f = this.settings.normalizer), f && (j = f.call(b, j), delete g.normalizer);
                for (d in g) { e = { method: d, parameters: g[d] }; try { if (c = a.validator.methods[d].call(this, j, b, e.parameters), "dependency-mismatch" === c && 1 === h) { i = !0; continue } if (i = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b))); if (!c) return this.formatAndAdd(b, e), !1 } catch (k) { throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", k), k instanceof TypeError && (k.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), k } }
                if (!i) return this.objectLength(g) && this.successList.push(b), !0
            },
            customDataMessage: function(b, c) { return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg") },
            customMessage: function(a, b) { var c = this.settings.messages[a]; return c && (c.constructor === String ? c : c[b]) },
            findDefined: function() {
                for (var a = 0; a < arguments.length; a++)
                    if (void 0 !== arguments[a]) return arguments[a]
            },
            defaultMessage: function(b, c) {
                "string" == typeof c && (c = { method: c });
                var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"),
                    e = /\$?\{(\d+)\}/g;
                return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d
            },
            formatAndAdd: function(a, b) {
                var c = this.defaultMessage(a, b);
                this.errorList.push({ message: c, element: a, method: b.method }), this.errorMap[a.name] = c, this.submitted[a.name] = c
            },
            addWrapper: function(a) { return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a },
            defaultShowErrors: function() {
                var a, b, c;
                for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight)
                    for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() { return this.currentElements.not(this.invalidElements()) },
            invalidElements: function() { return a(this.errorList).map(function() { return this.element }) },
            showLabel: function(b, c) {
                var d, e, f, g, h = this.errorsFor(b),
                    i = this.idOrName(b),
                    j = a(b).attr("aria-describedby");
                h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), e = this.groups[b.name], e && (g = this, a.each(g.groups, function(b, c) { c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id")) })))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h)
            },
            errorsFor: function(b) {
                var c = this.escapeCssMeta(this.idOrName(b)),
                    d = a(b).attr("aria-describedby"),
                    e = "label[for='" + c + "'], label[for='" + c + "'] *";
                return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e)
            },
            escapeCssMeta: function(a) { return a.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1") },
            idOrName: function(a) { return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name) },
            validationTargetFor: function(b) { return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0] },
            checkable: function(a) { return /radio|checkbox/i.test(a.type) },
            findByName: function(b) { return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']") },
            getLength: function(b, c) {
                switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                }
                return b.length
            },
            depend: function(a, b) { return !this.dependTypes[typeof a] || this.dependTypes[typeof a](a, b) },
            dependTypes: { "boolean": function(a) { return a }, string: function(b, c) { return !!a(b, c.form).length }, "function": function(a, b) { return a(b) } },
            optional: function(b) { var c = this.elementValue(b); return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch" },
            startRequest: function(b) { this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0) },
            stopRequest: function(b, c) { this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.submitButton && a("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1) },
            previousValue: function(b, c) { return c = "string" == typeof c && c || "remote", a.data(b, "previousValue") || a.data(b, "previousValue", { old: null, valid: !0, message: this.defaultMessage(b, { method: c }) }) },
            destroy: function() { this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur") }
        },
        classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } },
        addClassRules: function(b, c) { b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b) },
        classRules: function(b) {
            var c = {},
                d = a(b).attr("class");
            return d && a.each(d.split(" "), function() { this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]) }), c
        },
        normalizeAttributeRule: function(a, b, c, d) { /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0) },
        attributeRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d);
            return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e
        },
        dataRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), "" === d && (d = !0), this.normalizeAttributeRule(e, g, c, d);
            return e
        },
        staticRules: function(b) {
            var c = {},
                d = a.data(b.form, "validator");
            return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
        },
        normalizeRules: function(b, c) {
            return a.each(b, function(d, e) {
                if (e === !1) return void delete b[d];
                if (e.param || e.depends) {
                    var f = !0;
                    switch (typeof e.depends) {
                        case "string":
                            f = !!a(e.depends, c.form).length;
                            break;
                        case "function":
                            f = e.depends.call(c, c)
                    }
                    f ? b[d] = void 0 === e.param || e.param : (a.data(c.form, "validator").resetElements(a(c)), delete b[d])
                }
            }), a.each(b, function(d, e) { b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e }), a.each(["minlength", "maxlength"], function() { b[this] && (b[this] = Number(b[this])) }), a.each(["rangelength", "range"], function() {
                var c;
                b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]))
            }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b
        },
        normalizeRule: function(b) {
            if ("string" == typeof b) {
                var c = {};
                a.each(b.split(/\s/), function() { c[this] = !0 }), b = c
            }
            return b
        },
        addMethod: function(b, c, d) { a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b)) },
        methods: {
            required: function(b, c, d) { if (!this.depend(d, c)) return "dependency-mismatch"; if ("select" === c.nodeName.toLowerCase()) { var e = a(c).val(); return e && e.length > 0 } return this.checkable(c) ? this.getLength(b, c) > 0 : void 0 !== b && null !== b && b.length > 0 },
            email: function(a, b) { return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a) },
            url: function(a, b) { return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(a) },
            date: function() { var a = !1; return function(b, c) { return a || (a = !0, this.settings.debug && window.console && console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")), this.optional(c) || !/Invalid|NaN/.test(new Date(b).toString()) } }(),
            dateISO: function(a, b) { return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a) },
            number: function(a, b) { return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a) },
            digits: function(a, b) { return this.optional(b) || /^\d+$/.test(a) },
            minlength: function(b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e >= d },
            maxlength: function(b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e <= d },
            rangelength: function(b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e >= d[0] && e <= d[1] },
            min: function(a, b, c) { return this.optional(b) || a >= c },
            max: function(a, b, c) { return this.optional(b) || a <= c },
            range: function(a, b, c) { return this.optional(b) || a >= c[0] && a <= c[1] },
            step: function(b, c, d) {
                var e, f = a(c).attr("type"),
                    g = "Step attribute on input type " + f + " is not supported.",
                    h = ["text", "number", "range"],
                    i = new RegExp("\\b" + f + "\\b"),
                    j = f && !i.test(h.join()),
                    k = function(a) { var b = ("" + a).match(/(?:\.(\d+))?$/); return b && b[1] ? b[1].length : 0 },
                    l = function(a) { return Math.round(a * Math.pow(10, e)) },
                    m = !0;
                if (j) throw new Error(g);
                return e = k(d), (k(b) > e || l(b) % l(d) !== 0) && (m = !1), this.optional(c) || m
            },
            equalTo: function(b, c, d) { var e = a(d); return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() { a(c).valid() }), b === e.val() },
            remote: function(b, c, d, e) {
                if (this.optional(c)) return "dependency-mismatch";
                e = "string" == typeof e && e || "remote";
                var f, g, h, i = this.previousValue(c, e);
                return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && { url: d } || d, h = a.param(a.extend({ data: b }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, {
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: g,
                    context: f.currentForm,
                    success: function(a) {
                        var d, g, h, j = a === !0 || "true" === a;
                        f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, { method: e, parameters: b }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j)
                    }
                }, d)), "pending")
            }
        }
    });
    var c, d = {};
    return a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, c) { var e = a.port; "abort" === a.mode && (d[e] && d[e].abort(), d[e] = c) }) : (c = a.ajax, a.ajax = function(b) {
        var e = ("mode" in b ? b : a.ajaxSettings).mode,
            f = ("port" in b ? b : a.ajaxSettings).port;
        return "abort" === e ? (d[f] && d[f].abort(), d[f] = c.apply(this, arguments), d[f]) : c.apply(this, arguments)
    }), a
});
$(document).ready(function(){
    // Global
    $(".top-notif-menu li").on("click" , function(){
        var thisIndex = $(this).index();
        $(".top-notif-div > div").removeClass("active");
        $(".top-notif-div > div").eq(thisIndex).addClass("active");
    })
    $("body").on("click", ".popover a[data-name='go-today']" , function(){
        $("header").click();
    })
    // Uploader
    $(function() {
        var imagesPreview = function(input, placeToInsertImagePreview) {
            if (input.files) {
                var filesAmount = input.files.length;
                for (i = 0; i < filesAmount; i++) {
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        $($.parseHTML('<div class="col-lg-3" style="position: relative;"><button class="btn btn-danger remove-prw-img" style="position: absolute;top: 0;right: 0;z-index: 999!important;padding: 7px;"><i class="fa fa-trash"></i></button><img src="'+event.target.result+'"></div>')).appendTo(placeToInsertImagePreview);
                    }
                    reader.readAsDataURL(input.files[i]);
                }
            }
        };
        $('.file-selected').on('change', function() {
            imagesPreview(this, 'div.gallery');
        });
    });
    $("body").on("click", ".remove-prw-img" , function(){
        $(this).parent().hide();
    })
    $(".gal-btn").on("click", function() {
        $(".uploader-header li span").removeClass("active-upload");
        $(this).addClass("active-upload")
        $(".upload-div").hide();
        $(".gal-div").show();
        $(".select-uploader").show();
        $(".upload-fields").hide();
        $(".upload-btn-footer").hide();
    })
    $(".upload-btn").on("click", function() {
        $(".uploader-header li span").removeClass("active-upload");
        $(this).addClass("active-upload")
        $(".upload-div").show();
        $(".gal-div").hide();
        $(".select-uploader").hide();
        $(".upload-fields").show();
        $(".upload-btn-footer").show();
    })
    $(".gal-h3").on("click", function() {
        $(".gal-h3").removeClass("h3-active");
        $(this).addClass("h3-active")
        $(".gal-h3").next().not($(this).next()).slideUp();
        if ($(this).next().css("display") == 'block') {
            $(this).next().slideUp();
            $(this).removeClass("h3-active");
        } else {
            $(this).next().slideDown();
        }
    })
    $(".ubtn1").on("click", function() {
        $(".ubtn1").hide();
        $(".ubtn2").hide();
        $(".ubtn3").show();
        $(".ubtn4").show();
        $(".picinps").removeAttr("disabled");
    })
    $(".ubtn3 , .ubtn4").on("click", function() {
        $(".ubtn1").show();
        $(".ubtn2").show();
        $(".ubtn3").hide();
        $(".ubtn4").hide();
        $(".picinps").attr("disabled", "disabled");
    })
    $(".uimg").on("click", function() {
        $(this).prev().find("input").click();
        $(".upload-left .img-border").removeClass("no-border");
        $(".upload-left div video").hide();
        $(".show-file").hide();
        $(".upload-left div img").show();
        $(".uimg").parent().removeClass("active-border");
        $(".uvideo").parent().removeClass("active-border");
        $(".ufile").removeClass("active-border");
        $(this).parent().addClass("active-border");
        setTimeout(function() {
            $(".upload-left").addClass("upload-left-active");
        }, 500)
        $(".upload-right").removeClass("col-lg-12");
        $(".upload-right").addClass("col-lg-9");
        var picsrc = $(this).attr("src");
        var picname = $(this).data('name');
        var piclabel = $(this).data('label');
        var picdesc = $(this).data('desc');
        $(".left-img").attr("src", picsrc);
        $(".picname").val(picname);
        $(".piclabel").val(piclabel);
        $(".picdesc").val(picdesc);
        $(".deleteimgbtn").data('name',picname)
    })
    $(".uimg-2").on("click", function() {
        $(this).find("input").click();
    })
    $(".uvideo").on("click", function() {
        $(".upload-left .img-border").removeClass("no-border");
        $(".upload-left div img").hide();
        $(".show-file").hide();
        $(".upload-left div video").show();
        $(".uimg").parent().removeClass("active-border");
        $(".uvideo").parent().removeClass("active-border");
        $(".ufile").removeClass("active-border");
        $(this).parent().addClass("active-border");
        setTimeout(function() {
            $(".upload-left").addClass("upload-left-active");
        }, 500)
        $(".upload-right").removeClass("col-lg-12");
        $(".upload-right").addClass("col-lg-9");
        var picsrc = $(this).attr("src");
        var picname = $(this).data('name');
        var piclabel = $(this).data('label');
        var picdesc = $(this).data('desc');
        var picurl = $(this).data('url');
        $(".left-img").attr("src" , picsrc);
        $(".picname").val(picname);
        $(".piclabel").val(piclabel);
        $(".picdesc").val(picdesc);
        $(".upload-left div video source").attr("src" , picurl);
        $(".deleteimgbtn").data('name',picname)
    })
    $(".ufile").on("click", function() {
        $(".upload-left .img-border").addClass("no-border");
        $(".upload-left div img").hide();
        $(".show-file").show();
        $(".upload-left div video").hide();
        $(".ufile").removeClass("active-border");
        $(".uvideo").parent().removeClass("active-border");
        $(".uimg").parent().removeClass("active-border");
        $(this).addClass("active-border");
        setTimeout(function() {
            $(".upload-left").addClass("upload-left-active");
        }, 500)
        $(".upload-right").removeClass("col-lg-12");
        $(".upload-right").addClass("col-lg-9");
        var picsrc = $(this).attr("src");
        var picname = $(this).data('name');
        var piclabel = $(this).data('label');
        var picdesc = $(this).data('desc');
        var picurl = $(this).data('url');
        $(".left-img").attr("src" , picsrc);
        $(".picname").val(picname);
        $(".piclabel").val(piclabel);
        $(".picdesc").val(picdesc);
        $(".upload-left div video source").attr("src" , picurl);
        $(".deleteimgbtn").data('name',picname)
    })
    $(".custom-dropzone").on("dragend dragenter dragleave dragover dragstart drop", function() {
        return false;
    })
    $(".custom-dropzone").on("click", function() {
        $(".file-selected").click();
    })
    // Co Setting
    $(".remove-co-contact").on("click" , function(){
        var thisTitle = $(this).data("title");
        $("#remove-co-contact-modal").find(".rccm-title").text(thisTitle);
    })
    $(".remove-co-sm").on("click" , function(){
        var thisTitle = $(this).data("title");
        $("#remove-co-sm-modal").find(".rccm-title").text(thisTitle);
    })
    // Req List
    $(".close-req-btn").on("click" , function(){
        var thisCode = $(this).data("code");
        $("#close-req-modal").find(".req-code").text(thisCode);
    })
    // Add Product
    $(".remove-add-product-pic").on("click" , function(){
        var parentLen = $(".pics-carousel .slick-list .slick-track").children().length;
        if(parentLen <= 1){
            $(".pics-carousel").slideUp();
        }
        $(this).parent().remove();
    })
    $(".remove-kv-ap").on("click" , function(){
        var thisTitle = $(this).data("title");
        $("#remove-kv-ap-modal").find(".rccm-title").text(thisTitle);
    })
    $(".remove-prd-btn").on("click" , function(){
        var thisTitle = $(this).data("title");
        $("#remove-prd-modal").find(".rccm-title").text(thisTitle);
    })
    $(".dis-ga-btn").on("click" , function(){
        var thisTitle = $(this).data("name");
        $("#dis-modal").find(".rccm-title").text(thisTitle);
    })
    $(".act-ga-btn").on("click" , function(){
        var thisTitle = $(this).data("name");
        $("#act-modal").find(".rccm-title").text(thisTitle);
    })
    $(".remove-ga-btn").on("click" , function(){
        var thisTitle = $(this).data("name");
        $("#remove-ga-modal").find(".rccm-title").text(thisTitle);
    })
    $("#dis-modal , #act-modal , #remove-ga-modal").on("hidden.bs.modal", function (event) {
        $(".add-ga").click();
    })
    // Product List
    $(".act-prd-btn").on("click" , function(){
        var thisTitle = $(this).data("name");
        $("#act-modal").find(".rccm-title").text(thisTitle);
    })
    $(".dis-prd-btn").on("click" , function(){
        var thisTitle = $(this).data("name");
        $("#dis-modal").find(".rccm-title").text(thisTitle);
    })
    $(".comments-btn").on("click" , function(){
        var thisTitle = $(this).data("name");
        $("#comments-modal").find(".rccm-title").text(thisTitle);
    })
    $(".qa-btn").on("click" , function(){
        var thisTitle = $(this).data("name");
        $("#qa-modal").find(".rccm-title").text(thisTitle);
    })
    $(".change-date-btn").on("click" , function(){
        var thisTitle = $(this).data("name");
        var thisDate = $(this).data("date");
        $("#change-date-modal").find(".rccm-title").text(thisTitle);
        $("#change-date-modal").find(".prd-date-time").text(thisDate);
        $("#change-date-modal").find("#input1").val(thisDate);
    })
    $(".open-reply span").on("click" , function(){
        $(".reply-section-div").not($(this).parent().next()).slideUp();
        $(".open-reply span i").not($(this).find("i")).removeClass("reply-chevron");
        if($(this).parent().next().css("display") != "block"){
            $(this).parent().next().slideDown();
            $(this).find("i").addClass("reply-chevron");
        }else{
            $(this).parent().next().slideUp();
            $(this).find("i").removeClass("reply-chevron");
        }
    })
    // Add Admin
    $(".cus-prof-menu li").on("click" , function(){
        $(".cus-prof-menu li").removeClass("active-cust-profile");
        $(this).addClass("active-cust-profile");
        var thisIndex = $(this).index();
        var thisTitle = $(this).find(".m-nav__link-text").text();
        $(".add-admin-content-inner > div").hide(0);
        $(".add-admin-content-inner > div").eq(thisIndex).show(0);
        $(".add-admin-title cust_title").text(thisTitle);
    })
})
// Uploader
function closeDI(){
    $("#deleteimg").fadeOut();
}