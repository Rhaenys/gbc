/*
Student Name: Excelle Escalada
Student Number: 101096067
*/

#include "stdafx.h"
#include <iostream>
#include <cstring>
#include <string>
#include <time.h>

using namespace std;

enum objectType { ROCK, PAPER, SCISSORS };

bool validSelection(char selection);
int validMenuSelection();
objectType retrievePlay(char selection);
void convertEnum(objectType object);
objectType winningObject(objectType play1, objectType play2);
void gameResult(objectType play1, objectType play2, int& winner);
void newPlayer();
void showHighScore();
int i = 0;
void playRPS();
bool menuCycle = true;


int gameCount;
int winCount1 = 0;
int winCount2 = 0;

int gamewinner;
char response;

char selection1;
int randComPlay;
char selection2;

objectType play1;
objectType play2;

struct playerdata
{
	string playerName;
	int score;
};

playerdata player[50];

int main()
{
	newPlayer();
	playRPS();
	showHighScore();
	return 0;	
}

void newPlayer()
{
	i++;
	cout << "Enter your name: ";
	cin >> player[i].playerName;
}

int validMenuSelection()
{
	//while (menuCycle == true)
	//{ 
		cout << "1. Start the Game" << endl << "2. Change the player name" << endl << "3. Show highest scores" << endl << "4. Exit" << endl;
		cout << "What do you wanna do now?" << endl;
		int menuSelection;
		cin >> menuSelection;
		switch (menuSelection)
		{
		case 1:

			return 1;
		case 2:
			newPlayer();
			//menuCycle = true;
		case 3:
			return 3;
		case 4:
			return 4;
		default:
			cout << "1-4 Only" << endl;	
		}
	//}
}

void playRPS()
{
	while (validMenuSelection() == 1)
	{
		cout << "Welcome " << player[i].playerName << "." << endl;
		response = 'Y';
		while (response == 'Y' || response == 'y')
		{
			cout << "ROCK, PAPER or SCISSORS?" << endl;
			cin >> selection1;
			cout << endl;

			srand((unsigned)time(NULL));
			randComPlay = rand() % 3;
			if (randComPlay == 0)
				selection2 = 'R';
			else if (randComPlay == 1)
				selection2 = 'P';
			else
				selection2 = 'S';

			if (validSelection(selection1) && validSelection(selection2))
			{
				play1 = retrievePlay(selection1);
				play2 = retrievePlay(selection2);
				gameCount++;

				gameResult(play1, play2, gamewinner);
				if (gamewinner == 1)
					winCount1++;
				else if (gamewinner == 2)
					winCount2++;
			}
			cout << "Do you wanna play again? Y/y or N/n ";
			cin >> response;
			cout << endl;
		}
	}
}

bool validSelection(char selection)
{
	switch (selection)
	{
	case 'R':
	case 'r':
	case 'P':
	case 'p':
	case 'S':
	case 's':
		return true;
	default:
		return false;
	}
}

void showHighScore()
{
	while (validMenuSelection() == 3)
	{
		cout << "Here is players rank:" << endl;
		cout << "Rank" << "          " << "Player Name" << "          " << "No of Wins" << endl;
		for (int i = 1; i < 6; i++)
		{
			cout << i << "               " << player[i].playerName << "                       " << player[i].score << endl;
		}
		cout << endl;
	}
}

objectType retrievePlay(char selection)
{
	objectType object;
	switch (selection)
	{
	case 'R':
	case 'r':
		object = ROCK;
		break;
	case 'P':
	case 'p':
		object = PAPER;
		break;
	case 'S':
	case 's':
		object = SCISSORS;
		break;
	}
	return object;
}

void convertEnum(objectType object)
{
	switch (object)
	{
	case ROCK:
		cout << "Rock";
		break;
	case PAPER:
		cout << "Paper";
		break;
	case SCISSORS:
		cout << "Scissors";
		break;
	default:
		break;
	}
}

objectType winningObject(objectType play1, objectType play2)
{
	if ((play1 == ROCK && play2 == SCISSORS || play2 == ROCK && play1 == SCISSORS))
		return ROCK;
	if ((play1 == ROCK && play2 == PAPER || play2 == ROCK && play1 == PAPER))
		return PAPER;
	else
		return SCISSORS;
}

void gameResult(objectType play1, objectType play2, int& winner)
{
	objectType winnerObject;
	if (play1 == play2)
	{
		winner = 0;
		cout << "Both Players selected ";
		convertEnum(play1);
		cout << ". This game is a tie." << endl;
	}
	else
	{
		winnerObject = winningObject(play1, play2);
		cout << player[i].playerName << " selected ";
		convertEnum(play1);
		cout << " and I selected ";
		convertEnum(play2);
		cout << ".";
		if (play1 == winnerObject)
		{
			player[i].score++;
			cout << endl;
			cout << player[i].playerName << " wins this game. You now have " << player[i].score << " points." << endl;
			//winner = 1;
		}
		else if (play2 == winnerObject)
			//winner = 2;
			cout << " I won this game." << endl;
	}
}