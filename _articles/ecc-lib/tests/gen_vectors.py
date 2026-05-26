from sage.all import GF, EllipticCurve, inverse_mod


def words(x, count=8):
    return [((int(x) >> (32 * i)) & 0xFFFFFFFF) for i in range(count)]


def emit(name, xs):
    body = ", ".join(f"0x{x:08x}u" for x in xs)
    print(f"{name}: {body}")


p = 2**256 - 2**224 + 2**192 + 2**96 - 1
n = int("ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551", 16)
b = int("5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b", 16)
gx = int("6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296", 16)
gy = int("4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5", 16)

F = GF(p)
E = EllipticCurve(F, [F(-3), F(b)])
G = E(F(gx), F(gy))

field_x = int("0123456789abcdef00112233445566778899aabbccddeeff0102030405060708", 16)
field_y = int("0fedcba9876543210fffefdfcfbfaf9f8f7f6f5f4f3f2f1f0112233445566778", 16)

emit("P", words(p))
emit("N", words(n))
emit("B", words(b))
emit("GX", words(gx))
emit("GY", words(gy))
emit("FIELD_X", words(field_x))
emit("FIELD_Y", words(field_y))
emit("FIELD_ADD", words((field_x + field_y) % p))
emit("FIELD_SUB", words((field_x - field_y) % p))
emit("FIELD_MUL", words((field_x * field_y) % p))
emit("FIELD_SQR", words((field_x * field_x) % p))
emit("FIELD_INV", words(inverse_mod(field_x, p)))
emit("FIELD_MONT", words((field_x * (2**256 % p)) % p))
emit("R2", words(((2**256 % p) * (2**256 % p)) % p))

word_product = (2**32 - 1) * (2**32 - 1)
emit("WORD_PRODUCT", words(word_product, 2))

for label, k in [
    ("K0", 0),
    ("K1", 1),
    ("K2", 2),
    ("K3", 3),
    ("KN_MINUS_ONE", n - 1),
    ("K_FIXED_1", int("123456789abcdef", 16)),
    ("K_FIXED_2", int("fedcba98765432100123456789abcdef", 16)),
]:
    P = k * G
    if P == E(0):
        print(f"{label}: infinity")
    else:
        emit(f"{label}_X", words(P[0]))
        emit(f"{label}_Y", words(P[1]))

bad = E.is_on_curve(F(gx), F(gy + 1))
print(f"BAD_POINT_ON_CURVE: {bad}")
