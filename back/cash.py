# calender module  was imported below
import calendar
print(calendar.month(2023,1))
print('hello')

def drawTriangle():
    print('   /|')
    print('  / |')
    print(' /  |')
    print('/___|')

drawTriangle()
def count_ten():
     for i in range(10):
        print(i)

# count_ten()

#indexing,  slicing and striding
arr = [1,2,3,4,10, 6,9,7,8]

# print(arr[1:len(arr)])
for i in range(len(arr)):
    print(arr[i] )
arr.remove(10)
arr.insert(len(arr),10)
print(arr)