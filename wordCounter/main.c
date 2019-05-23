#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include "header.h"
#define maxFileSize 32097152

// To run file.exe -i input.txt -o output.txt
// results are stored in output text file

int main(int argc, char *argv[])
{
    checkArgs (argc, argv);

    int input = inputF (argc, argv);
    int output = outputF (argc, argv);

    printf("Reading files...\n");

    FILE *fo = fopen (argv[input], "r");

    if(!fo)
    {
        printf("Error reading input file!");
        exit(3);
    }

    FILE *fk = fopen (argv[output], "w");

    if(!fk)
    {
        printf("Error creating output file!");
        exit(4);
    }

    int characterWords[2]; //arrray storing no of characters [0] and words [1]

    long long int inputSize = checkFileSize (fo);
    printf ("Checking input file size ... %lli \n", inputSize);

    if (inputSize >= maxFileSize)
    {
        printf ("Sorry, file is too big!");
        fclose (fo);
        fclose (fk);
        exit (5);
    }

    printf ("Counting no of characters and words in file...");
    countCharacterWords (fo, characterWords);

    int numberOfCharacters = characterWords[0];
    int numberOfWords = characterWords[1];

    char * buf = malloc(sizeof(char) * numberOfCharacters);
    if (buf == NULL)
    {
        printf("\n\nError creating buffer");
        exit(7);
    }
    else printf("ok\n");

    printf ("Copying to buffer...\n");
    copyToBuf (fo, numberOfCharacters, buf);

    fclose(fo);
    printf ("Number of words: %d\n", numberOfWords);


    printf ("Initializing array of structs... ");

    words * word = malloc (sizeof (words) * numberOfWords);
    if (word == NULL)
    {
        printf("\n\nError creating array of structs");
        exit(7);
    }
    else printf("ok\n");


    printf ("Extracting words...\n");
    extractWords (word, numberOfWords, buf, numberOfCharacters);


    wipeData (word, numberOfWords);


    printf ("Counting occurences...\n");
    countOccurences (word, numberOfWords);


    printf ("Sorting...\n");
    qsort((void *) word, numberOfWords, sizeof (words), (int (*) ( void *,  void *)) compareWords);


	printf ("Saving...\n");
    printWords (word, numberOfWords, fk);

    free (buf);
    free (word);
    fclose (fk);


    printf ("Finished\n"); printf("number of characters: %d  words: %d", numberOfCharacters, numberOfWords);


    return 0;

}
