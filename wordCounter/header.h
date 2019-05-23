#include <stdbool.h>
#include <string.h>

typedef struct
{
    char    *word;
    int     count;
    bool    toCheck;
}
words;

void countCharacterWords (FILE *fo, int characterWords[]){

    char character;

    int i = 0;
    int s = 1;

    while (fscanf (fo, "%c", &character) != EOF)   i++;

    rewind (fo);
    character= 'p';

    while (fscanf (fo, "%c", &character) != EOF)
    {
        if (character == ' ')
        {
            s++;
        }
    }

    rewind (fo);
    characterWords[0] = i;        //no of characters
    characterWords[1] = s;    //no of words
}

void copyToBuf (FILE *fo, int numberOfCharacters, char buf[]){

    int i = 0;
    char character;

    while (fscanf (fo, "%c", &character) != EOF)
    {
        if (character == '\n')
        {
            character=' ';
        }

        if (character != '"')
        {
            buf[i] = character;
            i++;
        }
    }
}

void wipeData (words* word, int numberOfWords){

    for (int i = 0; i < numberOfWords; i++)
    {
        word[i].count = 1;
        word[i].toCheck = true;
    }
}

void countOccurences (words* word, int numberOfWords){

    int d, g, counter;

    for (d = 0; d < numberOfWords; d++)
    {
        counter = 1;

        if (word[d].toCheck)
        {
            for (g = d + 1; g < numberOfWords; g++)
            {
                if (strcmp (word[d].word , word[g].word) == 0)
                {
                    counter++;
                    word[g].toCheck = false;
                    word[g].count = -1;
                }
            }
        }

        word[d].count = counter;
    }
}

void extractWords (words* word, int numberOfWords, char buf[], int numberOfCharacters){

    char* temp;
    char separator[] = " ,./?!:;()@#$%^&*-\"[]1234567890--»«""•±";
    int i = 0;

    temp = strtok (buf, separator);
    word[i].word = strdup (temp);
    strlwr (word[i].word);

    while (temp != NULL)
    {
        i++;
        temp = strtok (NULL, separator);
        word[i].word = strdup (temp);
        strlwr (word[i].word);
    }
}

void checkArgs (int argc, char* argv[]) {

    int c = 0;

    if (argc != 5)
    {
        printf ("Wrong no of args!");
        exit (1);
    }

    for (int i = 0; i < argc; i++)
    {
        if (strcmp(argv[i], "-i") == 0) c++;
    }

    if (c == 1)
    {
        for (int i = 0; i < argc; i++)
        {
            if (strcmp(argv[i], "-o") == 0) c++;
        }
    }
    else c = 3;

    if (c != 2)
    {
        printf ("Wrong args!");
        exit (2);
    }
}

int inputF (int argc, char* argv[]){

    for (int i = 0; i < argc; i++)
    {
        if (strcmp (argv[i], "-i") == 0)
        {
            return i + 1;
        }
    }
}

int outputF (int argc, char* argv[]){

    for (int i = 0; i < argc; i++)
    {
        if (strcmp (argv[i], "-o") == 0)
        {
            return i + 1;
        }
    }
}

long long int checkFileSize (FILE* fo){

    fseek (fo, 0, SEEK_END);
    long long int fileSize = ftell (fo);
    fseek (fo, 0, SEEK_SET);

    return fileSize;
}

int compareWords (words *a, words *b)
{
    if (a->count < b->count) return +1;
    if (a->count > b->count) return -1;
    return strcmp(a->word, b->word);
    return 0;
}

void printWords (words* word, int numberOfWords, FILE *fk){

    for (int i = 0; i < numberOfWords; i++)
    {
        if (word[i].toCheck)
        {
            fprintf(fk, "%-32s\t%i\n", word[i].word, word[i].count);
        }
    }
}





