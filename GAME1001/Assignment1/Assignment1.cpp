// ConsoleApplication1.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>
#include <string>
#include <stdlib.h>
#include <time.h>

using namespace std;

int main()
{
	int currPlayer;
	int pop;
	string currPlayerName;
	int randPlayer;
	string player1;
	string player2;
	char start = 'y';

	while (start == 'y' || 'Y') {
		int balloonsLeft = 10;
		system("cls");
		cout << start;
		cout << "Welcome to Balloon Pop!" << endl;
		cout << "Please enter the name of Player 1: ";
		cin >> player1;
		cout << "Okay! Player 1 is " << player1 << endl;
		cout << "Please enter the name of Player 2: ";
		cin >> player2;
		cout << "Okay! Player 2 is " << player2 << endl;

		srand((unsigned)time(NULL));
		randPlayer = rand() % 2;
		if (randPlayer == 0)
			currPlayer = 1;
		else
			currPlayer = 2;

		if (currPlayer == 1) {
			cout << player1 << " goes first." << endl;
		}
		else {
			cout << player2 << " goes first." << endl;
			currPlayerName = player2;
		}
		while (balloonsLeft > 0) {
			cout << currPlayerName << ", pop one or two balloons. (" << balloonsLeft << " balloons left) ";
			scanf("%d", &pop);
			if (pop != 1 && 2)
				cout << "You can only pop up to two balloons!" << endl;
			else if (pop > balloonsLeft)
				cout << "There's only " << balloonsLeft << " balloon left. You can't pop more than that!" << endl;
			else {
				cout << currPlayerName << " popped " << pop << "!" << endl;
				balloonsLeft = balloonsLeft - pop;
				if (currPlayer == 1) {
					currPlayer = 2;
					currPlayerName = player2;
				}
				else {
					currPlayer = 1;
					currPlayerName = player1;
				}
			}
		}
		cout << "There are no balloons left. " << currPlayerName << " wins!" <<endl;
		cout << "Do you want to start another game? (Y/N) ";
		cin >> start;		
	}
		cout << "Thanks for popping the balloons! GOODBYE!";
	return 0;
}