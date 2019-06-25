#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int checkProvider();

int validateCard();

unsigned long long generateCard();



int main()
{

    unsigned long long cardNumber =0;

    int choice = 0;

    do{

        printf("Generated card is valid! Number: %llu\n",generateCard(choice));

        printf("\nChoose Card to generate (0 to exit):\n1.AMEX\n2.MASTERCARD\n3.VISA\n");

        fflush(stdin);

   }while(scanf("%d",&choice)!=1||choice!=0);

   if(choice!=0){

        printf("%llu",generateCard(choice));

    }

   return 0;
}

unsigned long long generateCard(int choice){

        unsigned long long cardNo = 0;

        srand(time(NULL));

        switch(choice){

        case 1:
            do{

                cardNo = rand() % (380000000000000 - 340000000000000) + 340000000000000; //AmExpress

            }while(checkProvider(cardNo) !=1);

            return cardNo;

            break;

        case 2:
            do{

               cardNo = rand() % (5600000000000000 - 5100000000000000) + 5100000000000000; //masterCard

            }while(checkProvider(cardNo) !=2);

            return cardNo;

            break;

        case 3:
            do{

               cardNo = rand() % (5000000000000000 - 4000000000000000) + 4000000000000000;  //visa

            }while(checkProvider(cardNo) !=3);

            return cardNo;

            break;

        }
}

int checkProvider(unsigned long long x){

    if((x>340000000000000 && x<350000000000000) || (x>370000000000000 && x<380000000000000)){//America Express

        if(validateCard(7,8,x,1) == 1) return 1;  //passing to function number of odd[1] and even[2] numbers, the number of card itself[3] and the information if the sum of digits is even or not[4].

        else return 0;

    }

    if(x>5100000000000000 && x<5600000000000000){ //Master Card

        if(validateCard(8,8,x,0) == 1) return 2;

        else return 0;

    }

    if(x>4000000000000000 && x<5000000000000000){//visa16

        if(validateCard(8,8,x,0)==1) return 3;

        else return 0;

    }

    if((x>4000000000000 && x<5000000000000)){//visa13

        if(validateCard(8, 8, x, 1) == 1) return 3;

        else return 0;

    }

    return 9;//none of them

}

int validateCard(int z, int y, unsigned long long number, int even){

    int values[z];

    int values2[y]; //Two arrays, each storing odd or even digits

    int i = z + y; //amount of digits on credit card (odd+even passed from previous function)

    int d = 0, e = 0; //counters for Array1&2

    if(even == 0){  //if number of digits on credit card isn't even it stores odd values in one array while even are stored in second.

        while (number > 0) {

            if(i%2 != 0){

                values[d] = number % 10;

                d++;

            }

            if(i%2==0) {

                values2[e] = number % 10;

                e++;

            }

        number = number / 10;

        i--;

        }

    }

    if(even == 1){

        while (number > 0) {

            if(i%2 == 0){

                values[d] = number % 10;

                d++;

            }

            if(i%2!=0) {

                values2[e] = number % 10;

                e++;

            }

        number = number / 10;

        i--;

        }

    }

    int controlValue1 = 0, controlValue2 = 0, controlValue = 0;

    for(int i=0; i<z; i++){

        if(values[i] > 4){

            values[i] = values[i] * 2 -9;

            controlValue1=controlValue1+values[i];

        }

        else controlValue1 = controlValue1 + values[i] *2;

    }


    for(int i=0; i<y; i++){

        controlValue2 = controlValue2 + values2[i];

    }

    controlValue = controlValue1 + controlValue2;

    if(controlValue % 10 == 0){

        return 1; //true;

    }

        else  return 0;  //false

}
