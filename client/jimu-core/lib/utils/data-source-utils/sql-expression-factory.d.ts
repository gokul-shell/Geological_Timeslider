import { ClauseLogic, type ClauseOperator, type SqlClause, type SqlClauseSet, type SqlExpression } from '../../types/sql-expression';
import { type DataSource } from '../../data-sources/data-source-interface';
/**
 * Create a SQLClause.
 */
export declare function createSQLClause(fieldName: string, operator: ClauseOperator, value: string | number, caseSensitive?: boolean): SqlClause;
/**
 * Create a SQLClauseSet.
 */
export declare function createSQLClauseSet(logicalOperator: ClauseLogic, parts: SqlClause[]): SqlClauseSet;
/**
 * Create a SQLExpression.
 */
export declare function createSQLExpression(logicalOperator: ClauseLogic, clauses: Array<SqlClause | SqlClauseSet>, dataSource: DataSource): SqlExpression;
/**
 * Get merged multiple SQLExpressions.
 */
export declare function getMergedSQLExpressions(sqlExpressions: SqlExpression[], dataSource: DataSource, logicalOperator?: ClauseLogic): SqlExpression;
