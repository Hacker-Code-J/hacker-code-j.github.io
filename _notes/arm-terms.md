---
title: ARMv8-A vs Cortex-A vs AArch64
date: 2025-08-21
categories: Assebmly
tags: armv8-a
layout: post
---

| Term                     | What it is                                                                                                                                               | Where it shows up                                                                              | How it relates to the others                                                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ARMv8 (esp. ARMv8-A)** | An **architecture/ISA version** specification (feature set). v8-A introduced 64-bit and modern extensions.                                               | Docs, compiler flags like `-march=armv8-a`.                                                    | A Cortex-A core **implements** some revision of ARMv8-A (v8.0-A, v8.2-A, etc.). It can support 32-bit (**AArch32**) and/or 64-bit (**AArch64**) states. |
| **Cortex-A**             | A **CPU core family** (microarchitectures) for the **A-profile** (apps/phones/tablets/laptops). Examples: Cortex-A53, A57, A72, A76, A55, X-series, etc. | CPU marketing names, `/proc/cpuinfo`, `lscpu`.                                                 | Each Cortex-A core is an **implementation** of an ARMv8-A (or ARMv9-A) ISA revision and thus exposes AArch64 (and sometimes AArch32).                   |
| **AArch64**              | The **64-bit execution state** / register width of the ARM ISA (the 64-bit instruction set and ABI).                                                     | OS/ABI names like `aarch64-linux-gnu`, `uname -m` → `aarch64`, package arch “arm64” (synonym). | AArch64 is a **mode** provided by ARMv8-A (and ARMv9-A) implementations like Cortex-A cores.                                                            |

### Mental model

* **ARMv8-A** = the *what* (spec/features).
* **Cortex-Axx** = the *how* (a specific core design that implements that spec).
* **AArch64** = the *64-bit mode* you run code in on those cores.

### Common gotchas

* **arm64 vs aarch64:** usually the same thing in practice (arm64 is the distro/Apple label; aarch64 is the GNU/ABI name).
* **AArch32 vs AArch64:** 32-bit vs 64-bit execution states. Some ARMv8-A chips support both; some newer ones drop AArch32.
* **Profiles:** A-profile (apps) = Cortex-A/Neoverse; R-profile (real-time) = Cortex-R; M-profile (MCU) = Cortex-M. Only A-profile runs desktop/mobile OSes like Linux/Android/macOS.

### Practical examples

* **Cortex-A53**: ARMv8-A core, supports AArch64 (64-bit) and AArch32 (32-bit).
* **Build flags:**

  * Portable 64-bit: `-march=armv8-a` (enables AArch64 baseline).
  * Target a core: `-mcpu=cortex-a53` (or `-mcpu=cortex-a72`) and optionally `-mtune=…` for perf.

### How to check on your machine

* Linux: `uname -m` → `aarch64` means you’re running 64-bit.
* Linux: `lscpu` shows “Architecture: aarch64” and “Model name” with the Cortex/SoC info.
* macOS on Apple Silicon: `uname -m` → `arm64` (Apple’s label for AArch64).

If you tell me your device/SoC (e.g., “Cortex-A55” or “Snapdragon 888”), I can map exactly which ARMv8-A revision and features (NEON/ASIMD, crypto, etc.) you have and suggest the right compiler flags.

Nice—here’s how **Cortex-A76** maps to your terms and what it gives you:

* **What it is:** a specific **Cortex-A family** core (A-profile) that implements **Armv8-A**, with **Armv8.2-A** as the baseline. It runs **AArch64 at all exception levels (EL0–EL3)** and supports **AArch32 only at EL0** (i.e., 32-bit user apps if the OS allows). ([Internet Archive][1])
* **Key ISA features present (beyond v8.0):**

  * **v8.1-A:** LSE atomics (CAS, LDADD, etc.). ([Internet Archive][1], [Arm Learning Paths][2])
  * **v8.2-A:** FP16 arithmetic in NEON/FP. ([Internet Archive][1], [Arm Developer][3])
  * **v8.3-A (subset):** LDAPR (load-acquire). ([Internet Archive][1])
  * **v8.4-A:** Dot-product (SDOT/UDOT) for int8 ML/vision code. ([Internet Archive][1], [Arm Developer][4])
  * **v8.5-A (subset):** SSBS & speculation barriers. ([Internet Archive][1])
  * **Also:** RAS, GICv4, PMUv3; crypto extension is optional per SoC. ([Internet Archive][1])
  * **Not supported:** SVE/SME (those appear in later cores). (Implied by A76 TRM feature list.) ([Internet Archive][1])

### Build it right

* **GCC/Clang (best default):**
  `-mcpu=cortex-a76`
  This selects Armv8.2-A and enables **FP16, dot-product, RCpc, SSBS**, plus tuning for A76. ([Android Git Repositories][5])
* **Portable alt (explicit ISA):**
  `-march=armv8.2-a+fp16+dotprod+lse -mtune=cortex-a76`
  (Use when you want to guarantee those instructions while still tuning for A76.) ([Arm Learning Paths][2], [Arm Developer][3])

### Real-world anchor

* **Raspberry Pi 5** uses a quad-core **Cortex-A76 @ 2.4 GHz** (AArch64), which is a handy public reference platform. ([Raspberry Pi Datasheets][6])

If you want, tell me your OS/toolchain and I’ll drop in copy-pasteable CFLAGS/LDFLAGS (and a quick `lscpu` feature check) tailored to your box.

[1]: https://archive.org/download/cortex-a76-r4p1-0401-00/Cortex-A76%20r4p1.pdf "Arm® Cortex®‑A76 Core Technical Reference Manual"
[2]: https://learn.arm.com/learning-paths/servers-and-cloud-computing/lse/intro/?utm_source=chatgpt.com "Introduction to Large System Extensions"
[3]: https://developer.arm.com/documentation/102374/latest/Data-processing---floating-point/Support-for-8-bit-and-16-bit-floating-point?utm_source=chatgpt.com "Support for 8-bit and 16-bit floating point"
[4]: https://developer.arm.com/documentation/102651/latest/What-are-dot-product-intructions-?utm_source=chatgpt.com "What are dot product instructions?"
[5]: https://android.googlesource.com/platform/prebuilts/clang/host/linux-x86/%2B/246e55fb1ef5190c1d19c9ce3ef8a77df7b8714e/clang-bootstrap/include/llvm/Support/AArch64TargetParser.def?utm_source=chatgpt.com "clang-bootstrap/include/llvm/Support/AArch64TargetParser.def"
[6]: https://datasheets.raspberrypi.com/rpi5/raspberry-pi-5-product-brief.pdf?utm_source=chatgpt.com "Raspberry Pi 5 product brief [pdf]"
