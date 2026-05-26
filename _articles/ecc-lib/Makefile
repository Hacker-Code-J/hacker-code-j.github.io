CC ?= cc
CFLAGS ?= -std=c99 -Wall -Wextra -Werror -pedantic -I./src

TEST_BIN = ecc_lib_tests
OBJS = src/ecc_lib.o tests/test_ecc_lib.o

.PHONY: all test vectors clean

all: test

$(TEST_BIN): $(OBJS)
	$(CC) $(CFLAGS) -o $(TEST_BIN) $(OBJS)

test: $(TEST_BIN)
	./$(TEST_BIN)

vectors:
	sage -python tests/gen_vectors.py

clean:
	rm -f $(TEST_BIN) $(OBJS)
