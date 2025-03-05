import random
import time
import threading


def generate_numbers(n):
    return [random.randint(1, 1000) for _ in range(n)]


def save_to_file(numbers, filename):
    with open(filename, 'w') as f:
        for num in numbers:
            f.write(f"{num}\n")


def read_from_file(filename):
    with open(filename, 'r') as f:
        return [int(line.strip()) for line in f]


def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break


def sort_in_thread(arr):
    bubble_sort(arr)


def main():
    file_name_s = "numbers_s.txt"
    file_name_l = "numbers_l.txt"
    numbers_s = generate_numbers(10)
    numbers_l = generate_numbers(10000)

    save_to_file(numbers_s, file_name_s)
    save_to_file(numbers_l, file_name_l)

    numbers_read_s = read_from_file(file_name_s)
    numbers_read_l = read_from_file(file_name_l)

    numbers_thread_s = numbers_read_s.copy()
    numbers_thread_l = numbers_read_l.copy()

    start_time = time.time()
    bubble_sort(numbers_read_s)
    bubble_sort(numbers_read_l)
    end_time = time.time()

    thread_s = threading.Thread(target=sort_in_thread, args=(numbers_thread_s,))
    thread_l = threading.Thread(target=sort_in_thread, args=(numbers_thread_l,))

    start_time_thread = time.time()
    thread_s.start()
    thread_l.start()

    thread_s.join()
    thread_l.join()
    end_time_thread = time.time()

    execution_time = end_time - start_time
    execution_time_thread = end_time_thread - start_time_thread

    print(f"Час виконання з використанням двох потоків: {execution_time_thread:.4f} секунд")
    print(f"Час виконання з використанням одного потоку: {execution_time:.4f} секунд")


if __name__ == "__main__":
    main()
